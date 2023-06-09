import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../configs/firebase";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineGoogle } from "react-icons/ai";
import { useStoreActions } from "../../store/hooks";
import { editUserDocument } from "../../utils/firebase/user";
import { useNavigate } from "react-router-dom";

export const GoogleAuth = () => {
  const { login } = useStoreActions((actions) => actions);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const authHandler = () => {
    signInWithPopup(auth, googleAuthProvider)
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
          <AiOutlineGoogle size={24} />
          Sign in with Google
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
