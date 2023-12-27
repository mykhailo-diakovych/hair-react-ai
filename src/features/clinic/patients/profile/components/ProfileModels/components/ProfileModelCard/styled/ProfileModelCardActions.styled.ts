import styled from "styled-components";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

export const ProfileModelCardActions = styled(GroupItems)`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.general.borderRadius}px !important;
  padding: 12px;
`;

export const ProfileModelCardAction = styled(ButtonText)`
  &:hover {
    color: ${(props) => props.theme.colors.malibuLight} !important;
  }
`;
