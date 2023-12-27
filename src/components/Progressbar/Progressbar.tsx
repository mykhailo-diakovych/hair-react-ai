import React from "react";
import { ProgressProps } from "antd";
import { ProgressbarContent } from "@components/Progressbar/styled/ProgressbarContent.styled";
import { ProgressbarContainer } from "@components/Progressbar/styled/ProgressbarContainer.styled";
import {
  ProgressWrapper,
  StyledProgressbar
} from "@components/Progressbar/styled/Progressbar.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";

interface ProgressbarProps extends ProgressProps {
  title?: string;
  text?: string;
  active?: boolean;
}

export const Progressbar = ({
  active = false,
  title,
  ...props
}: ProgressbarProps) => {
  return active ? (
    <ProgressbarContainer center column gap={15}>
      <ProgressbarContent column center centerY>
        <Paragraph fontWeight={600}>{title}</Paragraph>

        <ProgressWrapper>
          <StyledProgressbar />
        </ProgressWrapper>
      </ProgressbarContent>
    </ProgressbarContainer>
  ) : null;
};
