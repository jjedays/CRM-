import { auth } from "../../configs/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { LoadingButton } from "../LoadingButton";
import { useStoreActions } from "../../store/hooks";

export const SignOut = () => {
  const { logout } = useStoreActions((actions) => actions);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signOutHandler = async () => {
    setIsLoading(true);
    signOut(auth).then(() => {
      logout();
      setIsLoading(false);
    });
  };
  return (
    <LoadingButton
      variant="primary"
      onClick={signOutHandler}
      isLoading={isLoading}
    >
      Sign out
    </LoadingButton>
  );
};
