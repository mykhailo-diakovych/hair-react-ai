import styled from "styled-components";
import { Input } from "@components/Input/styled/Input.styled";

export const ControlledSearch = styled(Input)`
  width: 32px;
  height: 32px;
  padding: 4px;
  background-color: ${(props) => props.theme.colors.mystic};

  ${(props) => props.$isActive && `width: 100%;`}

  .ant-input-prefix {
    width: 20px;
    height: 20px;
  }

  .ant-input-prefix + .ant-input {
    margin-left: 5px;
  }
`;
