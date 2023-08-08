import { Button, Stack, TextInput } from "@mantine/core";
import { createFormContext } from "@mantine/form";
import { LoginFormValues } from "../../types/login.type";
import { getLoginFormSubmit } from "./submit";

import { Dispatch, SetStateAction } from "react";

const [FormProvider, useFormContext, useForm] =
  createFormContext<LoginFormValues>();

function FormInputs() {
  const formContext = useFormContext();
  return (
    <Stack spacing="lg">
      <TextInput label={"Serveur"} {...formContext.getInputProps("server")} />
      <TextInput
        label={"Nom d'utilisateur"}
        {...formContext.getInputProps("username")}
      />
      <TextInput
        label={"Mot de passe"}
        {...formContext.getInputProps("password")}
      />
    </Stack>
  );
}
export function LoginForm({
  reloadApp,
}: {
  reloadApp: Dispatch<SetStateAction<number>>;
}) {
  const form = useForm({
    initialValues: {
      server: "https://griff.veagle.fr",
      username: "pierrbt",
      password: "123456",
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
    },
  });

  return (
    <FormProvider form={form}>
      <form onSubmit={getLoginFormSubmit(form, reloadApp)}>
        <FormInputs />
        <Button mt="md" type="submit">
          Connexion
        </Button>
      </form>
    </FormProvider>
  );
}
