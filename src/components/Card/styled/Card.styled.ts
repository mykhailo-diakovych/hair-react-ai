import styled from "styled-components";

export const StyledCard = styled.article`
  padding: 20px 12px 20px 20px;
  background-color: ${(props) => props.theme.colors.tundora};
  border-radius: ${(props) => props.theme.general.borderRadius}px;
  min-height: 90px;
`;
