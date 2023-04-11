import { Button } from "react-bootstrap";
import { ILoadingButton } from "./types";
import { Oval } from "react-loader-spinner";

export const LoadingButton: React.FC<ILoadingButton> = ({
  isLoading,
  children,
  ...rest
}) => {
  return (
    <Button {...rest}>
      {isLoading ? (
        <Oval
          height={20}
          width={20}
          color="white"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#505050"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        children
      )}
    </Button>
  );
};
