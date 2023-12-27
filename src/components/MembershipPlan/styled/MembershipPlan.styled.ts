import styled, { css } from "styled-components";

interface MembershipPlan {
  $isSelected?: boolean;
}

export const StyledMembershipPlan = styled.div<MembershipPlan>`
  background-color: ${(props) => props.theme.colors.mystic};

  padding: 24px;
  border-radius: ${(props) => props.theme.general.borderRadius}px;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  border: 2px solid transparent;

  ${(props) =>
    props.$isSelected &&
    css`
      border-color: ${props.theme.colors.malibuLight};
    `}

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 10px;
  }
`;
