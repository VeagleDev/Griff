import styled from "styled-components";

export const Container = styled.div`
  height: 50%;
  background-color: #222;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
`;

interface SignUpContainerProps {
  signingIn: boolean;
}

export const SignUpContainer = styled.div<SignUpContainerProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signingIn !== true
      ? `
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  `
      : null}
  background-color: #292929;
`;

interface SignInContainerProps {
  signingIn: boolean;
}

export const SignInContainer = styled.div<SignInContainerProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(100%);` : null}
  background-color: #222;
`;

export const Form = styled.div`
  background-color: #292929;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  color: #a18dff;
`;

export const Input = styled.input`
  background-color: #333;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  color: #fff;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #a18dff;
  background-color: #a18dff;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #fff;
`;

export const Anchor = styled.a`
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

interface OverlayContainerProps {
  signingIn: boolean;
}

export const OverlayContainer = styled.div<OverlayContainerProps>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(-100%);` : null}
`;

interface OverlayProps {
  signingIn: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  background: linear-gradient(to right, #292929, #222);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #a18dff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(50%);` : null}
`;

interface OverlayPanelProps {
  signingIn: boolean;
}

export const OverlayPanel = styled.div<OverlayPanelProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signingIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: #fff;
`;
