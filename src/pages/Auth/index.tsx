import { Accordion, Alert } from "react-bootstrap";
import {
  EmailAuth,
  FacebookAuth,
  GoogleAuth,
  OtpAuth,
  SignOut,
} from "../../components";
import { useStoreState } from "../../store/hooks";
import { useEffect, useState } from "react";

export const Auth = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { user } = useStoreState((state) => state);

  useEffect(() => {
    var params = new URL(window.location.href).searchParams;
    if (params.get("admin")) {
      setShowAlert(true);
    }
  }, []);
  return (
    <div className="d-flex flex-column gap-3">
      {showAlert && user ? (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Oh no! You are not an admin!</Alert.Heading>
          <p>You should login as admin to use admin page</p>
        </Alert>
      ) : null}
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
