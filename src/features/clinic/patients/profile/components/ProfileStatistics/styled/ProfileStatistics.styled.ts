import styled from "styled-components";
import { ProfileStaticticsBase } from "@features/clinic/patients/profile/components/ProfileStatistics/ProfileStatictics";

export const ProfileStatistics = styled(ProfileStaticticsBase)`
  border-radius: 30px;
  padding: 5px 14px;
  background: ${({ theme }) => theme.background.primary};
`;
