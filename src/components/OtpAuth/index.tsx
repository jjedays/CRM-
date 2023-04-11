import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { RecaptchaVerifier, User, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../configs/firebase";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { LoadingButton } from "../LoadingButton";
import { useStoreActions } from "../../store/hooks";
import { editUserDocument } from "../../utils/firebase/user";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const OtpAuth = () => {
  const [error, setError] = useState<string>("");
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
          size: "normal",
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
      .catch((error: any) => {
        setError(error.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
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
      <Modal show={!!error} onHide={() => setError("")}>
        <Modal.Header closeButton>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Error: {error}</Modal.Body>
      </Modal>
    </>
  );
};
