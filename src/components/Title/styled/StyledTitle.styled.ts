import { compose, layout, space, typography } from "styled-system";
import styled from "styled-components";
import { TitleProps } from "@components/Title/Title";

export const StyledTitle = styled.h1<TitleProps>`
  margin: 0;
  font-weight: 600;

  ${(props) => props.$center && "text-align: center;"}

  ${(props) => props.$uppercase && "text-transform: uppercase;"}

  ${(props) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    props.theme.typography.titleLevels[props?.level.toString() || "1"]}

  ${(props) =>
    props.$iconName &&
    `
    display: inline-flex;
    align-items: center;
    column-gap: 10px;
  `}

  // styled-system additional props
  ${compose(space, layout, typography)}
`;
