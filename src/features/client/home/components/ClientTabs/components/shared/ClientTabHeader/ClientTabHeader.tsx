import React from "react";
import { StyledClientTabHeader } from "@features/client/home/components/ClientTabs/components/shared/ClientTabHeader/styled/ClientTabHeader.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";

export const ClientTabHeader = ({ header }: { header: string }) => {
  return (
    <StyledClientTabHeader>
      <Paragraph style={{ margin: "0 auto" }} size={"lg"} color={"gray7"}>
        {header}
      </Paragraph>
    </StyledClientTabHeader>
  );
};
