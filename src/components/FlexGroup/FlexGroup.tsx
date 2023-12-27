import {
  ColorProps,
  SpaceProps,
  color,
  space,
  flexbox,
  layout,
  LayoutProps,
  FlexboxProps
} from "styled-system";
import styled, { css } from "styled-components";

export interface FlexGroupProps
  extends SpaceProps,
    ColorProps,
    FlexboxProps,
    LayoutProps {
  spread?: boolean;
  column?: boolean;
  gap?: number;
  center?: boolean;
  centerY?: boolean;
  compact?: boolean;
  [key: string]: any;
}

export const FlexGroup = styled.div<FlexGroupProps>`
  display: flex;
  gap: 10px;
  width: 100%;

  ${(props) => !props.compact && `flex: 1 1 auto;`}

  ${(props) => props.compact && `width: auto; height: auto;`}

  ${(props) => (props.gap || props.gap === 0 ? `gap: ${props.gap}px;` : null)}
  
  ${(props) =>
    props.spread &&
    `
      justify-content: space-between;
    `}

${(props) =>
    props.center &&
    css`
      justify-content: center;
      align-items: start;
    `}
      
  ${(props) =>
    props.column &&
    css`
      flex-direction: column;
      align-items: stretch;
    `}
      
  ${(props) => props.centerY && `align-items: center;`}

  // styled-system additional props
  ${space}
  ${color}
  ${flexbox}
  ${layout}
`;
