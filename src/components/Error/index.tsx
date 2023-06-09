import { Button } from "react-bootstrap";
import { IError } from "./types";
import { FiRefreshCcw } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Error: React.FC<IError> = ({ errorText }) => {
  const navigate = useNavigate();

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center mb-5">
          <h1>Something went wrong!</h1>
          <h4 className="text-muted">
            You can't continue because of: {errorText}
          </h4>
        </div>
        <div className="d-flex gap-4">
          <Button
            className="d-flex align-items-center p-3"
            onClick={() => navigate(0)}
          >
            <FiRefreshCcw />
          </Button>
          <Button
            className="d-flex align-items-center p-3"
            onClick={() => navigate("/")}
          >
            <AiOutlineHome />
          </Button>
        </div>
      </div>
    </div>
  );
};
