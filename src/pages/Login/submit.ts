import axios from "axios";
import { checkServerUrl, getServerName } from "../../utils/serverUrl.util";
import toast from "../../utils/toast.util";
import ConfigType from "../../types/config.type";
import useConfig from "../../hooks/useConfig";
import { LoginFormValues, SignupFormValues } from "../../types/login.type";
import { Dispatch, SetStateAction } from "react";
import { User } from "../../types/user.type";

export function getLoginFormSubmit(
  form: any,
  reloadApp: Dispatch<SetStateAction<number>>,
) {
  return form.onSubmit(async (values: LoginFormValues) => {
    const { set } = useConfig();
    let data: any = null;
    try {
      const req = await axios.post(`${checkServerUrl(values.server)}/login`, {
        pseudo: values.username,
        password: values.password,
      });

      if (req.status !== 200) throw new Error(req.statusText);
      data = req.data;
      toast.success("Connexion réussie");
    } catch (error: any) {
      console.error(error);
      toast.error("Erreur lors de la connexion : " + error.message);
      return false;
    }

    const userData = data.user as User;
    const token = data.token as string;

    const config = {
      serverUrl: checkServerUrl(values.server),
      serverName: getServerName(values.server),
      username: values.username,
      firstName: userData.firstName,
      token: token,
      email: userData.email,
      installedGames: [],
    } as ConfigType;

    return await set("", "", config)
      .then(async (val) => {
        if (val) {
          reloadApp(1);
        } else {
          console.error("Error while saving config");
          toast.error("Erreur lors de la connexion");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

export function getSignupFormSubmit(
  form: any,
  reloadApp: Dispatch<SetStateAction<number>>,
) {
  return form.onSubmit(async (values: SignupFormValues) => {
    const { set } = useConfig();
    let token = "";

    try {
      const response = await axios.post(
        `${checkServerUrl(values.server)}/users`,
        {
          pseudo: values.username,
          password: values.password,
          email: values.email,
          firstName: values.firstName,
        },
      );

      if (response.status !== 200) throw new Error(response.statusText);

      token = response.data.token;
      toast.success("Utilisateur créé avec succès");
    } catch (error: any) {
      console.error(error);
      toast.error("Erreur lors de la connexion : " + error.message);
      return;
    }

    const config = {
      serverUrl: checkServerUrl(values.server),
      serverName: getServerName(values.server),
      username: values.username,
      firstName: values.firstName,
      token: token,
      email: values.email,
      installedGames: [],
    } as ConfigType;

    return await set("", "", config)
      .then(async (val) => {
        if (val) {
          reloadApp(1);
        } else {
          console.error("Error while saving config");
          toast.error("Erreur lors de la connexion");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
