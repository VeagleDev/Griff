import { Button, Stack, Title } from "@mantine/core";
import { createFormContext } from "@mantine/form";
import { TextInput } from "@mantine/core";
import ConfigType from "../types/config.type";
import { getServerName, checkServerUrl } from "../utils/serverUrl.util";
import useConfig from "../hooks/useConfig";
import toast from "../utils/toast.util";
import axios from "axios";
interface LoginFormValues {
  server: string;
  username: string;
  password: string;
  firstName: string;
  email: string;
}

const [FormProvider, useFormContext, useForm] =
  createFormContext<LoginFormValues>();

function ContextField() {
  const form = useFormContext();
  return (
    <Stack spacing="xs">
      <TextInput label={"Serveur"} {...form.getInputProps("server")} />
      <TextInput
        label={"Nom d'utilisateur"}
        {...form.getInputProps("username")}
      />
      <TextInput label={"Prénom"} {...form.getInputProps("firstName")} />
      <TextInput label={"Email"} {...form.getInputProps("email")} />
      <TextInput label={"Mot de passe"} {...form.getInputProps("password")} />
    </Stack>
  );
}

export function Login() {
  const { set } = useConfig();
  // Create form as described in use-form documentation
  const form = useForm({
    initialValues: {
      server: "https://griff.veagle.fr",
      username: "pierrbt",
      password: "123456",
      firstName: "Pierre",
      email: "pe08bt@gmail.com",
    },
    validate: {
      server: (value) => {
        if (!value) {
          return "Le serveur est requis";
        }
        if (!value.startsWith("http")) {
          return "Le serveur doit commencer par http ou https";
        }
      },
      username: (value) => {
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
      password: (value) => {
        if (!value) {
          return "Le mot de passe est requis";
        }
      },
      firstName: (value) => {
        if (!value) {
          return "Le prénom est requis";
        }
        if (value[0] !== value[0].toUpperCase()) {
          return "Le prénom doit commencer par une majuscule";
        }
      },
      email: (value) => {
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

  // Wrap your form with FormProvider
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
        <form
          onSubmit={form.onSubmit(async (values) => {
            let token = "";
            if (
              !(await axios
                .post(`${checkServerUrl(values.server)}/user`, {
                  pseudo: values.username,
                  password: values.password,
                  email: values.email,
                  firstName: values.firstName,
                })
                .then((response) => {
                  if (response.data.ok) {
                    token = response.data.token;
                    toast.success("Utilisateur créé avec succès");
                  } else {
                    console.error(response.data.message);
                    console.error(response.data.error);
                    throw new Error(response.data.message);
                  }
                  return true;
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("Erreur lors de la connexion : " + error.message);
                  return false;
                }))
            )
              return;

            const config = {
              serverUrl: checkServerUrl(values.server),
              serverName: getServerName(values.server),
              username: values.username,
              firstName: values.firstName,
              token: token,
              email: values.email,
              installedGames: [],
            } as ConfigType;

            await set("", "", config);
          })}
        >
          <ContextField />
          <Button mt="md" type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </Stack>
  );
}
