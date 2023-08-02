import { UseFormReturnType } from "@mantine/form";

export interface LoginFormValues {
  server: string;
  username: string;
  password: string;
  firstName: string;
  email: string;
}

export interface FormInputsProps {
  form: UseFormReturnType<LoginFormValues, (values: any) => any>;
}
