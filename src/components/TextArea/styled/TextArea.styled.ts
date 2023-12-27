import styled from "styled-components";
import { rgba } from "polished";
import { TextAreaBase, TextAreaProps } from "@components/TextArea/TextArea";

export const TextArea = styled(TextAreaBase)<TextAreaProps>`
  position: relative;
  width: 100%;

  textarea {
    border-radius: ${(props) => props.theme.general.borderRadius}px;
    width: 100%;
    min-height: 100px;
    z-index: 123123123;
    padding: 14px 24px;

    ${(props) => (props.icon ? `padding-left: 64px;` : `padding-left: 14px;`)}
  }

  & .ant-input::placeholder,
  &::placeholder {
    font-size: inherit;
    font-family: inherit;
    color: ${(props) => rgba(props.theme.colors.black, 0.5)};
    font-weight: 500;
    background-color: transparent;
  }
`;
