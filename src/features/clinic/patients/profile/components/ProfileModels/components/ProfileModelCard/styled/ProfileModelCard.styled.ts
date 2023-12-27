import styled, { css } from "styled-components";
import { ProfileModelCardBase } from "@features/clinic/patients/profile/components/ProfileModels/components/ProfileModelCard/ProfileModelCard";

export const ProfileModelCard = styled(ProfileModelCardBase)`
  cursor: pointer;
  padding: 10px;
  //width: 100%;
  border: 1.5px solid ${(props) => props.theme.colors.mystic};
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.gray};
  transition: border 0.3s ease-in-out;

  ${(props) =>
    props.selected
      ? css`
          border-color: ${props.theme.colors.malibuLight};
        `
      : null}

  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100%;
  }
`;
