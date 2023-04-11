import { Accordion } from "react-bootstrap";
import {
  EmailAuth,
  FacebookAuth,
  GoogleAuth,
  OtpAuth,
  SignOut,
} from "../../components";
import { useStoreState } from "../../store/hooks";

export const Auth = () => {
  const { user } = useStoreState((state) => state);
  return (
    <div className="d-flex flex-column gap-3">
      {user ? (
        <div className="d-flex flex-column gap-3 align-items-start">
          <SignOut />
        </div>
      ) : (
        <>
          <div className="d-flex flex-column gap-3 align-items-start">
            <GoogleAuth />
            <FacebookAuth />
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Auth via mobile phone number</Accordion.Header>
              <Accordion.Body>
                <OtpAuth />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Auth via email and password</Accordion.Header>
              <Accordion.Body>
                <EmailAuth />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      )}
    </div>
  );
};
