import { Button } from "react-bootstrap";

export interface ILoadingButton
  extends React.ComponentPropsWithoutRef<typeof Button> {
  isLoading?: boolean;
  children: React.ReactNode;
}
