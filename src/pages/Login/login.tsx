import {Button, Stack, TextInput, Title} from "@mantine/core";
import {createFormContext, UseFormReturnType} from "@mantine/form";
import {LoginFormValues} from "../../types/login.type";
import { getFormSubmit } from "./submit";

const [FormProvider, useFormContext, useForm] =
  createFormContext<LoginFormValues>();

function FormInputs() {
  const formContext = useFormContext();
  return (
    <Stack spacing="xs">
      <TextInput label={"Serveur"} {...formContext.getInputProps("server")} />
      <TextInput
        label={"Nom d'utilisateur"}
        {...formContext.getInputProps("username")}
      />
      <TextInput label={"Prénom"} {...formContext.getInputProps("firstName")} />
      <TextInput label={"Email"} {...formContext.getInputProps("email")} />
      <TextInput label={"Mot de passe"} {...formContext.getInputProps("password")} />
    </Stack>

  );
}
export function Login() {

  const form = useForm({
    initialValues: {
      server: "https://griff.veagle.fr",
      username: "pierrbt",
      password: "123456",
      firstName: "Pierre",
      email: "pe08bt@gmail.com",
    },
    validate: {
      server: (value: string) => {
        if (!value) {
          return "Le serveur est requis";
        }
        if (!value.startsWith("http")) {
          return "Le serveur doit commencer par http ou https";
        }
      },
      username: (value: string) => {
        // Between 2 and 26 characters, alphanumeric
        if (!value) {
          return "Le nom d'utilisateur est requis";
        }

        if (value.length < 2 || value.length > 26) {
          return "Le nom d'utilisateur doit être entre 2 et 26 caractères";
        }

        if (!value.match(/^[a-zA-Z0-9]+$/)) {
          return "Le nom d'utilisateur ne doit contenir que des caractères alphanumériques";
        }
      },
      password: (value: string) => {
        if (!value) {
          return "Le mot de passe est requis";
        }
      },
      firstName: (value: string) => {
        if (!value) {
          return "Le prénom est requis";
        }
        if (value[0] !== value[0].toUpperCase()) {
          return "Le prénom doit commencer par une majuscule";
        }
      },
      email: (value: string) => {
        if (!value) {
          return "L'email est requis";
        }
        if (
          !value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          return "L'email doit être valide";
        }
      },
    },
  });

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
          <FormInputs />
          <Button mt="md" type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </Stack>
  );
}
