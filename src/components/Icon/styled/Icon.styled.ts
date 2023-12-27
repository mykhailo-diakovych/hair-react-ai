import styled from "styled-components";
import { Styles } from "polished/lib/types/style";
import { important } from "polished";
import { IconBase } from "@components/Icon/Icon";

export const Icon = styled(IconBase)`
  display: inline-flex;
  color: ${(props) => props.$color || "inherit"} !important;

  ${(props) => props.style && important(props.style as Styles)}

  .ant-input-prefix & {
    margin-right: 20px;
  }
`;
