import { PositionProps } from "styled-system";
import React from "react";
import { Crisp } from "crisp-sdk-web";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";
import { ButtonProps } from "@components/Button/Button";

interface ChatProps extends ButtonProps, PositionProps {}

export const ChatBase = ({ className, ...props }: ChatProps) => {
  const handleChatOpen = () => {
    if (Crisp.chat.isChatOpened()) {
      Crisp.chat.close();
    } else {
      Crisp.chat.open();
    }
  };

  return (
    <ButtonIcon
      className={className}
      iconName={"button/chat"}
      onClick={() => {
        handleChatOpen();
      }}
      {...props}
    />
  );
};
