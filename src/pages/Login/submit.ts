import axios from "axios";
import { checkServerUrl, getServerName } from "../../utils/serverUrl.util";
import toast from "../../utils/toast.util";
import ConfigType from "../../types/config.type";
import useConfig from "../../hooks/useConfig";
import { LoginFormValues } from "../../types/login.type";

export function getFormSubmit(form: any, complete: Function) {
  return form.onSubmit(async (values: LoginFormValues) => {
    const { set } = useConfig();
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

    return await set("", "", config)
      .then(async (val) => {
        console.log("zépartie");
        if(val) complete(true)
        else console.log("zépartie pas");
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
