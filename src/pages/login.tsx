import {Button, Stack, Title} from "@mantine/core";
import { createFormContext } from "@mantine/form";
import { TextInput } from "@mantine/core";
import ConfigType from "../types/config.type";
import {getServerName, checkServerUrl} from "../utils/serverUrl.util";

interface LoginFormValues {
  server: string;
  username: string;
  password: string;
}


const [FormProvider, useFormContext, useForm] = createFormContext<LoginFormValues>();


function ContextField() {
  const form = useFormContext();
  return (
    <Stack spacing="xs">
      <TextInput
        label={"Server"}
        {...form.getInputProps("server")}
      />
      <TextInput
        label={"Username"}
        {...form.getInputProps("username")}
      />
      <TextInput
        label={"Password"}
        {...form.getInputProps("password")}
      />
    </Stack>
  )
}

export function Login() {
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
          return "Server is required";
        }
        if(!value.startsWith("http")) {
          return "Server must start with http:// or https://"
        }
      },
      username: (value) => {
        // Between 2 and 26 characters, alphanumeric
        if (!value) {
          return "Username is required";
        }
        return (/^[a-zA-Z0-9]{2,26}$/).test(value);
      }
    }
  });

  // Wrap your form with FormProvider
  return (
    <Stack
      spacing="lg"
      align="stretch"
      sx={{width: "80%", margin: "15px auto 0 auto"}}
    >
      <Title order={1} bottom="15px">Login</Title>



      <FormProvider form={form}>
        <form onSubmit={form.onSubmit((values) => {
          // Get the token or throw an error


          const config = {
            serverUrl: checkServerUrl(values.server),
            serverName: getServerName(values.server),
            username: values.username,
            token: "",
            email: "",
            installedGames: [],
          } as ConfigType;

          console.log(config);
        })}>
          <ContextField />
          <Button mt="md" type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </Stack>
  );
}