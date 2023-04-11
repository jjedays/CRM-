import { Navigate } from "react-router-dom";

export interface IProtectedRouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  isAuthenticated,
  authenticationPath,
  outlet,
}) => {
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};
