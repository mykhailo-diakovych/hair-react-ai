import { color, space, typography } from "styled-system";
import styled from "styled-components";
import { ParagraphProps } from "@components/Paragraph/Paragraph";

export const StyledParagraph = styled.p<ParagraphProps>`
  margin: 0;

  ${(props) => props.$uppercase && `text-transform: uppercase;`}

  ${(props) => props.center && `text-align: center;`}

  ${(props) => props.size && props.theme.typography.paragraphSizes[props.size]};

  ${(props) =>
    (props.iconName || props.flexCenter) &&
    `
    display: inline-flex;
    align-items: center;
    column-gap: 10px;
  `}

  // styled-system additional props
  ${space}
  ${color}
  ${typography}
`;
