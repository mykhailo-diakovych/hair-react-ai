import styled from "styled-components";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

export const NavigationButton = styled(ButtonText)`
  &.swiper-button-disabled {
    border-color: transparent !important;
    opacity: unset !important;

    &:hover {
      color: ${(props) => props.theme.colors.gray7} !important;

      svg {
        color: ${(props) => props.theme.colors.gray7} !important;
      }
    }
  }
`;
