import styled from "styled-components";
import { darken } from "polished";
import { LinkProps } from "@components/Link/Link";

export const StyledLink = styled.a<LinkProps>`
  display: inline-flex;
  align-items: center;
  justify-self: start;
  justify-content: flex-start;
  width: auto;
  transition: color 0.2s ease-in-out;

  ${(props) =>
    props.center &&
    `
    justify-content: center; 
    place-self: center;
    `}

  ${(props) => props.color && `color: ${props.color};`}

  &:hover {
    ${(props) => props.color && `color: ${darken(0.1, props.color)};`}
  }
`;
