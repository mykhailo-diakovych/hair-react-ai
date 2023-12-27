import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const CreateNewModelControlsWrapper = styled(FlexGroup)`
  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    flex-direction: column;
  }
`;

export const CreateNewModelControls = styled(FlexGroup)`
  flex: 1 1 auto;
  width: auto;
  justify-content: flex-end;

  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    button {
      flex: 1 1 100%;
    }
  }
`;
