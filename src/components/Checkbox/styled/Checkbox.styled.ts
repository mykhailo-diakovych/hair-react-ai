import styled from "styled-components";

import { CheckboxBase } from "@components/Checkbox/Checkbox";

export const Checkbox = styled(CheckboxBase).attrs({
  className: "checkbox-container"
})`
  display: inline-flex;
  align-items: center;
  color: ${(props) => props.theme.colors.gray800};
  cursor: pointer;
  align-self: flex-start;

  .checkbox-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.malibu600};
    width: 21px;
    height: 21px;
    padding: 4px;
    border: 1.5px solid ${(props) => props.theme.colors.malibu600};
    border-radius: 6px;
    margin-right: 14px;
  }

  .checkbox-icon svg {
    transform: scale(0);
    transition: transform 0.2s ease-in-out;
  }

  & input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  & input[type="checkbox"]:checked + .checkbox-icon svg {
    transform: scale(1);
  }
`;
