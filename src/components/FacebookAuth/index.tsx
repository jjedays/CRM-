import { Button } from "react-bootstrap";
import { AiOutlineFacebook } from "react-icons/ai";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookAuthProvider } from "../../configs/firebase";
import { useState } from "react";
import { useStoreActions } from "../../store/hooks";
import { editUserDocument } from "../../utils/firebase/user";

export const FacebookAuth = () => {
  const { login } = useStoreActions((actions) => actions);
  const [error, setError] = useState<string>("");

  const authHandler = () => {
    signInWithPopup(auth, facebookAuthProvider)
      .then(({ user }) => {
        login(user);
        editUserDocument(user);
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  return error ? (
    <h6 className="text-danger font-weight-bold">Error: {error}</h6>
  ) : (
    <Button variant="primary" onClick={authHandler}>
      <div className="d-flex align-items-center gap-1">
        <AiOutlineFacebook size={24} />
        Sign in with Facebook
      </div>
    </Button>
  );
};
