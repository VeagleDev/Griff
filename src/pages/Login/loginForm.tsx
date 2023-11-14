import {Button, Flex, Stack, TextInput, Title} from "@mantine/core";
import {createFormContext} from "@mantine/form";
import {LoginFormValues} from "../../types/login.type";
import {getLoginFormSubmit} from "./submit";

import {Dispatch, SetStateAction} from "react";
import {TbPassword, TbServer, TbUserCircle} from "react-icons/tb";

const [FormProvider, useFormContext, useForm] =
  createFormContext<LoginFormValues>();

function FormInputs({ submit }: { submit: Function }) {
  const formContext = useFormContext();
  return (
    <Flex justify="space-between" direction="column" style={{ height: "100%" }}>
      <Title>Connectez-vous</Title>
      <Stack spacing="md">
        <TextInput
          placeholder={"Serveur"}
          icon={<TbServer />}
          {...formContext.getInputProps("server")}
        />
        <TextInput
          placeholder={"Nom d'utilisateur"}
          icon={<TbUserCircle />}
          {...formContext.getInputProps("username")}
        />
        <TextInput
          placeholder={"Mot de passe"}
          icon={<TbPassword />}
          {...formContext.getInputProps("password")}
        />
      </Stack>

      <Button
        style={{ bottom: 0 }}
        onClick={() => {
          if (!formContext.validate().hasErrors) submit();
        }}
      >
        Connexion
      </Button>
    </Flex>
  );
}
export function LoginForm({
  reloadApp,
}: {
  reloadApp: Dispatch<SetStateAction<number>>;
}) {
  const form = useForm({
    initialValues: {
      server: "http://localhost:3000",
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
      <form style={{ height: "80%" }}>
        <FormInputs submit={getLoginFormSubmit(form, reloadApp)} />
      </form>
    </FormProvider>
  );
}
