import { Button, Modal } from "react-bootstrap";
import { AiOutlineFacebook } from "react-icons/ai";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookAuthProvider } from "../../configs/firebase";
import { useState } from "react";
import { useStoreActions } from "../../store/hooks";
import { editUserDocument } from "../../utils/firebase/user";
import { useNavigate } from "react-router-dom";

export const FacebookAuth = () => {
  const { login } = useStoreActions((actions) => actions);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const authHandler = () => {
    signInWithPopup(auth, facebookAuthProvider)
      .then(({ user }) => {
        login(user);
        editUserDocument(user.uid as string);
        return navigate("/profile");
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={authHandler}>
        <div className="d-flex align-items-center gap-1">
          <AiOutlineFacebook size={24} />
          Sign in with Facebook
        </div>
      </Button>
      <Modal show={!!error} onHide={() => setError("")}>
        <Modal.Header closeButton>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Error: {error}</Modal.Body>
      </Modal>
    </>
  );
};
