import { Stack, TextInput } from "@mantine/core";
import { FormInputsProps } from "../../types/login.type";

export function FormInputs(props: FormInputsProps) {
  const { form } = props;
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
