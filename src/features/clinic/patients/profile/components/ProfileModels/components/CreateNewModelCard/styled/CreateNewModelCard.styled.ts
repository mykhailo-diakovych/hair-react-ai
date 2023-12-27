import styled from "styled-components";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { Button } from "@components/Button/styled/Button.styled";

export const StyledCreateNewModelCard = styled(GroupItems)`
  width: 100%;
  max-width: 400px;
  min-height: 142px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

export const StyledCreateNewModelArea = styled(Button)`
  align-items: center;
  width: 100%;
  //max-width: 400px;
  min-height: 142px;
  margin-bottom: 12px;
  border-style: dashed;
  background-color: ${(props) => props.theme.background.secondary};

  // @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
  //   max-width: 100%;
  // }
`;

export const StyledNewModelTip = styled(Paragraph)`
  padding: 10px;
  background-color: ${(props) => props.theme.background.secondary};
`;
