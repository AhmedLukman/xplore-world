import { useEffect, useLayoutEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Logo from "../../components/ui/Logo";
import LoginOptions from "./LoginOptions";
import PromptLink from "../../components/ui/PromptLink";
import HeadingText from "../../components/ui/HeadingText";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../components/ui/Input";
import {
  ACTION_TYPE,
  FormSubmissionEvent,
  InputChangeEvent,
} from "../../lib/types";
import Form from "../../components/ui/Form";
import { validateEmail, validatePassword } from "../../utils/ValidationUtil";
import useAuth from "../../hooks/useAuth";
import ErrorText from "../../components/ui/ErrorText";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    state: { registrationError },
    dispatch,
  } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const initialErrorState = { email: "", password: "" };
  const [error, setError] = useState(initialErrorState);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const emailInputChangeHandler = (e: InputChangeEvent) => {
     if (registrationError) {
       setIsFormSubmitted(false);
       dispatch({ type: "RESET_ERROR" });
     }
    error.email && setError(initialErrorState);
    setEmail(e.target.value);
  };
  const passwordInputChangeHandler = (e: InputChangeEvent) => {
     if (registrationError) {
       setIsFormSubmitted(false);
       dispatch({ type: "RESET_ERROR" });
     }
    error.password && setError(initialErrorState);
    setPassword(e.target.value);
  };

  const handleFormSubmission = (e: FormSubmissionEvent) => {
    e.preventDefault();

    if (!validateEmail(email, setError)) return;
    if (!validatePassword(password, setError)) return;

    const USER_INPUT = { email, password, isChecked };

    dispatch({ type: ACTION_TYPE.USER_LOGIN, payload: USER_INPUT });

    setIsFormSubmitted(true);
  };

  useEffect(() => {
    // Check for registration error after the state has updated
    if (registrationError) {
      return;
    }
    if (isFormSubmitted) {
      toast.success("Successfully logged in!");
      navigate("/login");
    }
  }, [registrationError, navigate, isFormSubmitted]);

  useLayoutEffect(() => {
    dispatch({ type: ACTION_TYPE.RESET_ERROR });
  }, [dispatch]);

  // px-36 py-10sm
  return (
    <div className="mx-auto max-w-md px-8 py-8 md:basis-1/2">
      <div className="mb-10 flex justify-center">
        <Logo />
      </div>
      <HeadingText>Login</HeadingText>
      <Form>
        <Input
          error={error.email || registrationError}
          type="email"
          label="Enter your email:"
          onChange={emailInputChangeHandler}
        />
        <Input
          error={error.password || registrationError}
          label="Enter your password:"
          onChange={passwordInputChangeHandler}
        />
        <LoginOptions onCheckboxChange={handleCheckboxChange} />
        {(error.email || error.password || registrationError) && (
          <ErrorText>
            {error.email || error.password || registrationError}
          </ErrorText>
        )}
        <Button onClick={handleFormSubmission}>
          <span className="hover-effect">Login</span>
          <FontAwesomeIcon className="hover-effect" icon={faPowerOff} />
        </Button>
        <PromptLink type="login" />
      </Form>
    </div>
  );
};

export default LoginForm;
