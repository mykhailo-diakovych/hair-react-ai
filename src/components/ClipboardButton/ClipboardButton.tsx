import { ButtonType } from "src/types/buttonTypes.type";
import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { ConditionalWrapper } from "@helpers/conditionalWrapper";
import { ButtonOutlined } from "@components/Button/styled/ButtonOutlined.styled";
import { Button } from "@components/Button/styled/Button.styled";

interface ClipboardProps {
  parentRef: React.RefObject<any>;
  childSelector?: string;
  buttonText?: string;
  buttonType?: ButtonType;
}

export const ClipboardButton = ({
  parentRef,
  childSelector,
  buttonText,
  buttonType = "default"
}: ClipboardProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");

  const copyToClipboard = () => {
    const text = childSelector
      ? parentRef.current?.querySelector(childSelector)
      : parentRef.current;

    if (text) {
      navigator.clipboard.writeText(text.textContent || "");
      setTooltipText("Copied!");
      setTooltipVisible(true);
    }
  };

  useEffect(() => {
    if (tooltipVisible) {
      const timeout = setTimeout(() => {
        setTooltipVisible(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [tooltipVisible]);

  const buttonProps = {
    onMouseEnter: () => {
      setTooltipVisible(true);
    },
    onMouseLeave: () => {
      setTooltipVisible(false);
    },
    onClick: copyToClipboard
  };

  return (
    <Tooltip open={tooltipVisible} title={tooltipText}>
      <ConditionalWrapper
        wrapper={(children) =>
          buttonType === "default" ? (
            <ButtonOutlined type="default" {...buttonProps}>
              {children}
            </ButtonOutlined>
          ) : (
            <Button {...buttonProps}>{children}</Button>
          )
        }
      >
        {buttonText || "copy"}
      </ConditionalWrapper>
    </Tooltip>
  );
};
