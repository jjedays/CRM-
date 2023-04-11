import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../configs/firebase";
import { Button } from "react-bootstrap";
import { AiOutlineGoogle } from "react-icons/ai";
import { useStoreActions } from "../../store/hooks";

export const GoogleAuth = () => {
  const { login } = useStoreActions((actions) => actions);
  const [error, setError] = useState<string>("");

  const authHandler = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        login(user);
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
        <AiOutlineGoogle size={24} />
        Sign in with Google
      </div>
    </Button>
  );
};