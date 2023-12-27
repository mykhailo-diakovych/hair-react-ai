import styled from "styled-components";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

export const GalleryImage = styled(ButtonText)<{
  image: string;
  $selected: boolean;
}>`
  padding: 0;
  margin: 0;
  aspect-ratio: 3/4;
  position: relative;
  width: ${(props) => props.$width};

  ${(props) =>
    props.$selected
      ? `border: 3px solid ${props.theme.colors.malibuLight}`
      : null};

  border-radius: ${(props) => props.theme.general.borderRadius}px !important;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  span,
  img {
    border-radius: inherit !important;
  }

  span {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0px 0px 2px #000000);
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    flex: 0 0 60px;
  }
`;
