import {Box, Button, Divider, Flex, Modal, Text, TextInput,} from "@mantine/core";
import DataConfig from "../../types/config.type";
import {TbServer} from "react-icons/tb";
import {FormEvent} from "react";
import z from "zod";
import api from "../../services/api.service";
import toast from "../../utils/toast.util";
import useConfig from "../../hooks/useConfig";

async function changeInformations(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  try {
    const { firstName, username, password } = event.currentTarget;

    const updateUserObject = z

      .object({
        pseudo: z
          .string()
          .min(3, "Pseudo must be at least 3 characters long")
          .optional(),
        firstName: z
          .string()
          .min(3, "First name must be at least 3 characters long")
          .optional(),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long")
          .optional(),
      })
      .partial()
      .refine((data) => Object.keys(data).length > 0, {
        message: "At least one parameter is required",
      });

    const user = updateUserObject.parse({
      pseudo: username.value,
      firstName: firstName.value,
      password: password.value,
    });

    await api.put("/users", user).then(async (res) => {
      console.log(res);
      const { firstName, pseudo } = res.data.user;
      const config = useConfig();
      await config.set("firstName", firstName);
      await config.set("username", pseudo);
    });

    toast.success("Informations mises à jour avec succès !");
  } catch (err) {
    console.error(err);
    toast.error("Impossible de mettre à jour les informations");
  }
}

function AccountModal({
  opened,
  close,
  config,
}: {
  opened: boolean;
  close: () => void;
  config: DataConfig;
}) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={` Bonjour, ${
        config.firstName || "Utilisateur"
      } ! Vous pouvez modifier vos informations d'utilisateur ici.`}
      centered
      size={"xl"}
    >
      <Divider my="sm" />
      <Box maw={340} mx="auto" mb="md">
        <form onSubmit={changeInformations}>
          <TextInput
            label="Prénom"
            name="firstName"
            placeholder={config.firstName || "Utilisateur"}
          />

          <TextInput
            label="Pseudo"
            name="username"
            placeholder={config.username || "Utilisateur"}
            mt="md"
          />

          <TextInput
            label="Mot de passe"
            name="password"
            type="password"
            placeholder={"griffexcellence"}
            mt="md"
          />

          <Button
            type="submit"
            variant="filled"
            style={{ marginTop: "15px", width: "100%" }}
          >
            Enregistrer les modifications
          </Button>
        </form>
      </Box>

      <Divider my="sm" />

      <Flex justify="space-between" style={{ width: "95%", margin: "0 auto" }}>
        <Text
          c="dimmed"
          size="xs"
          style={{ display: "flex", alignItems: "center" }}
        >
          version 1.02
        </Text>

        <Text size="md" display="flex" style={{ alignItems: "center" }}>
          <TbServer style={{ marginRight: "10px" }} />
          {config.serverUrl || "Serveur Griff"}
        </Text>

        <Button variant="filled" color="red">
          Déconnexion
        </Button>
      </Flex>
    </Modal>
  );
}

export { AccountModal };
