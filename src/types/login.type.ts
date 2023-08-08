export interface SignupFormValues {
  server: string;
  username: string;
  password: string;
  firstName: string;
  email: string;
}

export interface LoginFormValues {
  server: string;
  username: string;
  password: string;
}

export interface FormInputsProps {
  getInputProps: any;
}
