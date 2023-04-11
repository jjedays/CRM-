import {
  FacebookAuth,
  GoogleAuth,
  OtpAuth,
  EmailAuth,
  SignOut,
} from "./components";

function App() {
  return (
    <div>
      <GoogleAuth />
      <FacebookAuth />
      <OtpAuth />
      <EmailAuth />
      <SignOut />
    </div>
  );
}

export default App;
