import {
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { IAddTransferFormProps, ITransferData } from "./types";
import { getUsersByRole } from "../../utils/firebase/user";
import { useState } from "react";
import { IUser } from "../../models/user";
import { TiTick } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { LoadingButton } from "../LoadingButton";
import { addTransferDocument } from "../../utils/firebase/transfers";

export const AddTransferForm: React.FC<IAddTransferFormProps> = ({
  users,
  reload,
}) => {
  const [transfer, setTransfer] = useState<ITransferData>({
    dispatch: null,
    driver: null,
    passengers: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const resetForm = () => {
    setTransfer({
      dispatch: null,
      driver: null,
      passengers: null,
    });
    reset();
  };

  const submitForm = handleSubmit((data) => {
    setIsLoading(true);
    const { dispatch, driver, passengers } = transfer;
    const { startPoint, destination } = data;
    if (!dispatch || !driver || !passengers || !passengers?.length) {
      setError("Add user to every category");
    } else {
      addTransferDocument(
        dispatch,
        driver,
        passengers,
        destination,
        startPoint
      );
      setIsSuccess(true);
      resetForm();
      reload();
    }
    setIsLoading(false);
  });
  const setDispatch = (dispatch: IUser) => {
    setTransfer({ ...transfer, dispatch });
  };

  const setDriver = (driver: IUser) => {
    setTransfer({ ...transfer, driver });
  };

  const isPassengerChosen = (passenger: IUser) => {
    return transfer.passengers?.filter(
      (currentPassenger) => currentPassenger.user === passenger.user
    ).length;
  };

  const setPassenger = (passenger: IUser) => {
    const isInList = isPassengerChosen(passenger);

    if (isInList && transfer.passengers) {
      return setTransfer({
        ...transfer,
        passengers:
          transfer.passengers?.filter(
            (currentPassenger) => currentPassenger.user !== passenger.user
          ) || [],
      });
    }

    return setTransfer({
      ...transfer,
      passengers: [...(transfer.passengers || []), passenger],
    });
  };

  return (
    <>
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="formBasicDispatch">
          <Form.Label>Choose dispatch</Form.Label>
          <DropdownButton
            title={
              transfer.dispatch
                ? transfer.dispatch?.displayName || transfer.dispatch.user
                : "No dispatch"
            }
          >
            {getUsersByRole(users, "Dispatch").map((user) => {
              return (
                <Dropdown.Item
                  key={user.user}
                  onClick={() => setDispatch(user)}
                >
                  {user.displayName || user.user}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDriver">
          <Form.Label>Choose driver</Form.Label>
          <DropdownButton
            title={
              transfer.driver
                ? transfer.driver?.displayName || transfer.driver.user
                : "No driver"
            }
          >
            {getUsersByRole(users, "Driver").map((user) => {
              return (
                <Dropdown.Item key={user.user} onClick={() => setDriver(user)}>
                  {user.displayName || user.user}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassengers">
          <Form.Label>Choose passengers</Form.Label>
          <DropdownButton title="Passengers">
            {getUsersByRole(users, "Passenger").map((user) => {
              return (
                <Dropdown.Item
                  key={user.user}
                  onClick={() => setPassenger(user)}
                >
                  {isPassengerChosen(user) && <TiTick color="green" />}
                  {user.displayName || user.user}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicStartPoint">
          <Form.Label>Start Point</Form.Label>
          <Form.Control
            placeholder="Start point"
            isInvalid={!!errors?.startPoint?.message}
            {...register("startPoint", {
              required: "Start Point is required",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.startPoint?.message?.toString()}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDestination">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            placeholder="Destination"
            isInvalid={!!errors?.destination?.message}
            {...register("destination", {
              required: "Destination is required",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.destination?.message?.toString()}
          </Form.Control.Feedback>
        </Form.Group>
        <LoadingButton isLoading={isLoading} variant="primary" type="submit">
          Submit
        </LoadingButton>
      </Form>
      <Modal show={!!error} onHide={() => setError("")}>
        <Modal.Header closeButton>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Error: {error}</Modal.Body>
      </Modal>

      <ToastContainer position="top-start" className="p-3">
        <Toast
          bg="success"
          onClose={() => setIsSuccess(false)}
          show={isSuccess}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>
            <span className="text-light">Successfully added</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
