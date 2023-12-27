import { position } from "styled-system";
import styled from "styled-components";
import { ChatBase } from "@components/Chat/Chat";

export const Chat = styled(ChatBase)`
  flex: 0 0 46px;
  width: 46px;
  height: 46px;
  padding: 11px;
  border-radius: 100% !important;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.mystic};

  ${position}
`;
