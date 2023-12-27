import styled from "styled-components";
import { Link } from "@components/Link/Link";

export const EmailLink = styled(Link).attrs({})`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.malibuLight};

  &:hover {
    text-decoration: none;
  }
`;
