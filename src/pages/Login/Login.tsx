import React, { Dispatch, SetStateAction } from "react";
import * as Components from "./Components";
import "./styles.css";
import { SignupForm } from "./signupForm";
import { LoginForm } from "./loginForm";

export function Login({
  reloadApp,
}: {
  reloadApp: Dispatch<SetStateAction<number>>;
}) {
  const [signIn, toggle] = React.useState(true);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginTop: "-10%",
      }}
    >
      <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form>
            <SignupForm reloadApp={reloadApp} />
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form>
            <LoginForm reloadApp={reloadApp} />
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Bienvenue !</Components.Title>
              <Components.Paragraph>
                Entrez vos informations personnelles et commencez avec Griff !
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Se connecter
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Content de vous revoir !</Components.Title>
              <Components.Paragraph>
                Connectez vous pour accéder à Griff
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                S'inscrire
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}
