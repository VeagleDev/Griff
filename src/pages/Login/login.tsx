import { Button, Stack, Title } from "@mantine/core";
import { createFormContext } from "@mantine/form";
import { LoginFormValues } from "../../types/login.type";
import { FormInputs } from "./form";
import { getForm } from "./form-function";
import { getFormSubmit } from "./submit";

const [FormProvider, useFormContext, useForm] =
  createFormContext<LoginFormValues>();

export function Login() {
  const form = getForm(useForm);

  return (
    <Stack
      spacing="lg"
      align="stretch"
      sx={{ width: "80%", margin: "15px auto 0 auto" }}
    >
      <Title order={1} bottom="15px">
        Login
      </Title>

      <FormProvider form={form}>
        <form onSubmit={getFormSubmit(form)}>
          <FormInputs form={useFormContext()} />
          <Button mt="md" type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </Stack>
  );
}
