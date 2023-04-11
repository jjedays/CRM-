import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { auth } from "../../configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { LoadingButton } from "../LoadingButton";
import { useStoreActions } from "../../store/hooks";
import { editUserDocument } from "../../utils/firebase/user";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const EmailAuth = () => {
  const [isNewAccount, setIsNewAccount] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const { login } = useStoreActions((actions) => actions);

  const setAuthType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNewAccount((prev) => !prev);
  };

  const createAccount = async (data: FieldValues) => {
    const { email, password } = data;
    await createUserWithEmailAndPassword(auth, email, password).catch((err) => {
      setError(err.code);
    });
  };

  const loginInAccount = async (data: FieldValues) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        login(user);
        editUserDocument(user.uid as string);
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  const submitForm = handleSubmit((data) => {
    setIsLoading(true);
    (isNewAccount ? createAccount : loginInAccount)(data).finally(() => {
      setIsLoading(false);
    });
    return navigate("/profile");
  });

  return (
    <>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="Is new account"
        checked={isNewAccount}
        onChange={setAuthType}
      />
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            isInvalid={!!errors?.email?.message}
            {...register("email", {
              required: "Email is required",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.email?.message?.toString()}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            isInvalid={!!errors?.password?.message}
            {...register("password", { required: "Password is required" })}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.password?.message?.toString()}
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
    </>
  );
};
