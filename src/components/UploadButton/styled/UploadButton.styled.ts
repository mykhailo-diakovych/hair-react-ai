import styled, { css } from "styled-components";
import { rgba } from "polished";
import { ButtonOutlined } from "@components/Button/styled/ButtonOutlined.styled";

export const StyledUploadButton = styled(ButtonOutlined)`
  --color: transparent;

  position: relative;
  flex-direction: column;
  gap: 10px;
  border: 1px solid transparent;
  background-color: ${(props) => props.theme.background.primary};
  min-height: 160px;
  transition: width 0s, height 0s, padding 0s;
  box-shadow: 0px 0px 4px 0px rgba(214, 214, 214, 0.9) inset,
    -1px -1px 4px 0px #f5f5f5 inset;
  overflow: hidden;

  ${(props) =>
    props.$placeholderImage &&
    css`
      position: relative;
      background-image: url(${props.$placeholderImage});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: ${rgba(props.theme.colors.white, 0.8)};
      }
    `}

  &:has(img) {
    padding: 0 !important;
    height: 100%;
    gap: 0;
    transition: border-color 0.3s ease-in-out;
    background: ${(props) =>
      props.style.backgroundColor || "transparent"} !important;
    border: 3px solid var(--color) !important;

    &:active {
      background: transparent !important;
      border: 3px solid var(--color) !important;
    }

    ${(props) =>
      props.$isActive &&
      !props.$isError &&
      css`
        --color: ${props.theme.colors.malibuLight};
      `}

    ${(props) =>
      props.$isError &&
      css`
        border: 1px dashed ${props.theme.colors.red} !important;

        &::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background-color: ${rgba(
            props.theme.colors.mineshaft,
            0.8
          )} !important;
        }
      `}
  }

  img {
    flex: 1 1 auto;
  }
`;
