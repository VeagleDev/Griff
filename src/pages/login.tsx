import { Button, Stack, Title } from "@mantine/core";
import { createFormContext } from "@mantine/form";
import { TextInput } from "@mantine/core";
import ConfigType from "../types/config.type";
import { getServerName, checkServerUrl } from "../utils/serverUrl.util";
import useConfig from "../hooks/useConfig";

interface LoginFormValues {
  server: string;
  username: string;
  password: string;
}

const [FormProvider, useFormContext, useForm] =
  createFormContext<LoginFormValues>();

function ContextField() {
  const form = useFormContext();
  return (
    <Stack spacing="xs">
      <TextInput label={"Server"} {...form.getInputProps("server")} />
      <TextInput label={"Username"} {...form.getInputProps("username")} />
      <TextInput label={"Password"} {...form.getInputProps("password")} />
    </Stack>
  );
}

export function Login() {
  const { set } = useConfig();
  // Create form as described in use-form documentation
  const form = useForm({
    initialValues: {
      server: "https://griff.veagle.fr",
      username: "",
      password: "",
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
          onSubmit={form.onSubmit((values) => {
            // Get the token or throw an error

            const config = {
              serverUrl: checkServerUrl(values.server),
              serverName: getServerName(values.server),
              username: values.username,
              token: "",
              email: "",
              installedGames: [],
            } as ConfigType;

            set("", "", config);

            console.log(config);
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
