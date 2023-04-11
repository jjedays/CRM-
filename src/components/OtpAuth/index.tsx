import { useCallback, useState } from "react";
import OtpInput from "react-otp-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../configs/firebase";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Error } from "../Error";
import { LoadingButton } from "../LoadingButton";
import { useStoreActions } from "../../store/hooks";

export const OtpAuth = () => {
  const [error, setError] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPhoneNumberSet, setIsPhoneNumberSet] = useState<boolean>(false);
  const { login } = useStoreActions((actions) => actions);

  const phoneNumberRegexp =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  const onSignUp = () => {
    setIsLoading(true);
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, "+" + phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsPhoneNumberSet(true);
      })
      .catch((error) => {
        setError(error.code);
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

  const OTPVerify = useCallback(() => {
    setIsLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (result: any) => {
        login(result.user as typeof auth.currentUser);
      })
      .catch((error: any) => {
        setError(error.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [otp, login]);

  return error ? (
    <Error errorText={error} />
  ) : (
    <>
      {isPhoneNumberSet ? (
        <div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
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
