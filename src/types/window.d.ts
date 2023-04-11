import { Auth } from "firebase/auth";

export {};

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}
