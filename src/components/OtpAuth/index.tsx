import { useEffect, useState } from "react";
import { RecaptchaVerifier, User, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../configs/firebase";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { LoadingButton } from "../LoadingButton";
import { useStoreActions } from "../../store/hooks";
import { editUserDocument } from "../../utils/firebase/user";
import { useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";

export const OtpAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPhoneNumberSet, setIsPhoneNumberSet] = useState<boolean>(false);
  const { login } = useStoreActions((actions) => actions);
  const navigate = useNavigate();

  const phoneNumberRegexp =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  useEffect(() => {
    setPhoneNumber("");
  }, []);

  const onSignUp = () => {
    setIsLoading(true);
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, "+" + phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsPhoneNumberSet(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            onSignUp();
          },
        },
        auth
      );
    }
  };

  const OTPVerify = () => {
    setIsLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (result: any) => {
        login(result.user as User);
        editUserDocument(result.user.uid as string);
        return navigate("/profile");
      })
      .finally(() => {
        setOtp("");
        setIsLoading(false);
      });
  };

  return (
    <>
      {isPhoneNumberSet ? (
        <div>
          <OTPInput
            value={otp}
            onChange={setOtp}
            autoFocus
            OTPLength={6}
            otpType="number"
            disabled={false}
          />
          <LoadingButton
            className="mt-3"
            variant="primary"
            onClick={OTPVerify}
            isLoading={isLoading}
          >
            Verify
          </LoadingButton>
        </div>
      ) : (
        <div>
          <PhoneInput
            country="ua"
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value)}
          />
          <div id="recaptcha-container"></div>
          {phoneNumber.match(phoneNumberRegexp) && (
            <LoadingButton
              className="mt-3"
              variant="primary"
              onClick={onSignUp}
              isLoading={isLoading}
            >
              Next
            </LoadingButton>
          )}
        </div>
      )}
    </>
  );
};
