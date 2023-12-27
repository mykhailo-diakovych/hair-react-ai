import styled from "styled-components";
import { SizesType } from "src/types/sizes.type";

export const StyledCodeBlock = styled.pre<{ size: SizesType }>`
  padding: 16px;
  max-height: 300px;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.mystic};
  border-radius: ${(props) => props.theme.general.borderRadius}px;

  ${(props) => props.theme.typography.paragraphSizes[props.size]};
`;
