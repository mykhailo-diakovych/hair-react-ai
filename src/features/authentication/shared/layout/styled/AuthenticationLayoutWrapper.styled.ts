import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const AuthenticationLayoutWrapper = styled(FlexGroup)`
  height: 100%;
  min-height: 100vh;
  min-height: 100dvh;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    flex-direction: column-reverse;
    height: auto;
  }
`;
