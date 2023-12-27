import styled from "styled-components";
import { rgba } from "polished";
import { SpinnerBase } from "@components/Spinner/Spinner";

export const Spinner = styled(SpinnerBase)`
  position: absolute;
  inset: 0;
  z-index: 101;
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    //filter: blur(5px);
    background-color: ${(props) => rgba(props.theme.colors.white, 0.8)};
  }
`;
