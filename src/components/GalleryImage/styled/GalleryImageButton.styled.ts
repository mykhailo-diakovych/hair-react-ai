import styled from "styled-components";
import { darken } from "polished";

export const GalleryImageButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.black};
  padding: 2px;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    background-color: ${(props) =>
      darken(0.1, props.theme.colors.red)} !important;
  }
`;
