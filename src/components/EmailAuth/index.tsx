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

export const EmailAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isNewAccount, setIsNewAccount] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { login } = useStoreActions((actions) => actions);

  const setAuthType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNewAccount((prev) => !prev);
  };

  const createAccount = async () => {
    await createUserWithEmailAndPassword(auth, email, password).catch((err) => {
      setError(err.code);
    });
  };

  const loginInAccount = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        login(user);
        editUserDocument(user);
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    (isNewAccount ? createAccount : loginInAccount)().finally(() => {
      setIsLoading(false);
    });
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
