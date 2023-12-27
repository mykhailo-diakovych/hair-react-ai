import styled from "styled-components";
import { BreadcrumbsBase } from "@components/Breadcrumbs/Breadcrumbs";

export const BreadcrumbsStyled = styled(BreadcrumbsBase)`
  .ant-breadcrumb-link {
    color: ${({ theme }) =>
      theme.general.borderRadius
        ? theme.colors.dovegray
        : theme.colors.scorpion};
  }

  li:last-child .ant-breadcrumb-link {
    color: ${({ theme }) =>
      theme.config.darkMode ? theme.colors.primary : theme.colors.scorpion};

    &:hover {
      color: ${({ theme }) => theme.colors.malibuLight};
    }
  }

  .ant-breadcrumb-separator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  a {
    color: inherit;
  }

  a:hover {
    background-color: transparent;
  }
`;
