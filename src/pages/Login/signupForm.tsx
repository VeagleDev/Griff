import { Button, Flex, Stack, TextInput, Title } from "@mantine/core";
import { createFormContext } from "@mantine/form";
import { SignupFormValues } from "../../types/login.type";
import { getSignupFormSubmit } from "./submit";
import {
  TbServer,
  TbUserCircle,
  TbMail,
  TbPassword,
  TbFaceId,
} from "react-icons/tb";

import { Dispatch, SetStateAction, useState } from "react";

const [FormProvider, useFormContext, useForm] =
  createFormContext<SignupFormValues>();

function FormInputs({ submit }: { submit: Function }) {
  const formContext = useFormContext();
  const [step, setStep] = useState(1);
  return (
    <Flex justify="space-between" direction="column" sx={{ height: "100%" }}>
      <Title>Inscrivez-vous</Title>
      {step === 1 ? (
        <TextInput
          placeholder={"Serveur"}
          icon={<TbServer />}
          {...formContext.getInputProps("server")}
        />
      ) : step === 2 ? (
        <Stack spacing="md">
          <TextInput
            placeholder={"Nom d'utilisateur"}
            icon={<TbUserCircle />}
            {...formContext.getInputProps("username")}
          />
          <TextInput
            placeholder={"Prénom"}
            icon={<TbFaceId />}
            {...formContext.getInputProps("firstName")}
          />
          <TextInput
            placeholder={"Email"}
            icon={<TbMail />}
            {...formContext.getInputProps("email")}
          />
        </Stack>
      ) : step === 3 ? (
        <TextInput
          placeholder={"Mot de passe"}
          icon={<TbPassword />}
          {...formContext.getInputProps("password")}
        />
      ) : null}

      <Button
        sx={{ bottom: 0 }}
        onClick={() => {
          switch (step) {
            case 1:
              if (!formContext.validateField("server").hasError) setStep(2);
              break;
            case 2:
              if (
                !formContext.validateField("username").hasError &&
                !formContext.validateField("firstName").hasError &&
                !formContext.validateField("email").hasError
              )
                setStep(3);
              break;
            case 3:
              if (!formContext.validateField("password").hasError) submit();
          }
        }}
      >
        {step < 3 ? "Suivant" : "Soumettre"}
      </Button>
    </Flex>
  );
}
export function SignupForm({
  reloadApp,
}: {
  reloadApp: Dispatch<SetStateAction<number>>;
}) {
  const form = useForm({
    initialValues: {
      server: "http://localhost:3000",
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
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
        ) {
          return "L'email doit être valide";
        }
      },
    },
  });

  return (
    <FormProvider form={form}>
      <form style={{ height: "80%" }}>
        <FormInputs submit={getSignupFormSubmit(form, reloadApp)} />
      </form>
    </FormProvider>
  );
}
