import { useEffect, useState } from "react";
import { getUserDocument } from "../../utils/firebase/user";
import { useStoreState } from "../../store/hooks";
import { Error } from "../../components";
import { Oval } from "react-loader-spinner";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { editUserDocument } from "../../utils/firebase/user";
import { IUser } from "../../models/user";

export const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const { user } = useStoreState((state) => state);

  useEffect(() => {
    setIsLoading(true);
    getUserDocument(user!.uid)
      .then((res) => {
        reset(res);
      })
      .catch((err) => {
        setError(err.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, reset]);

  if (error) return <Error errorText={error} />;
  if (isLoading)
    return (
      <div className="d-flex h-100 justify-content-center align-items-center">
        <Oval
          height={50}
          width={50}
          color="white"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#505050"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );

  const submitForm = handleSubmit((data) => {
    setIsLoading(true);
    const { age, displayName, bio } = data as IUser;
    editUserDocument(user!.uid, age, displayName, bio)
      .then(() => setIsSuccess(true))
      .finally(() => {
        setIsLoading(false);
      });
  });

  return (
    <div>
      <h1 className="mb-4">Edit profile data</h1>
      <Form onSubmit={submitForm} noValidate>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            isInvalid={!!errors?.displayName?.message}
            {...register("displayName", { required: "Name is required" })}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.displayName?.message?.toString()}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Your age"
            isInvalid={!!errors?.age?.message}
            {...register("age", {
              required: "Age is required",
              min: { value: 3, message: "User can't be younger then 3 y.o." },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.age?.message?.toString()}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Bio"
            isInvalid={!!errors?.bio?.message}
            {...register("bio", {
              required: "Bio is required",
              minLength: {
                value: 20,
                message: "Bio can't be shorter then 20 symbols",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.bio?.message?.toString()}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
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
            <span className="text-light">Successfully updated</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};
