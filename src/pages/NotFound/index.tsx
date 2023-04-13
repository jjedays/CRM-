import { Button } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "../../animations/404.json";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center mb-5">
          <Lottie
            animationData={animation}
            loop={true}
            className="w-25 h-25 mx-auto"
          />
        </div>
        <div className="d-flex gap-4">
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
