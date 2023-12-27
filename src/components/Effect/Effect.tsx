import React, { MutableRefObject } from "react";
import { DeepAR } from "deepar";
import { getImageUrl } from "@helpers/getImageUrl";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { StyledEffect } from "@components/Effect/styled/Effect.styled";

export interface EffectProps extends React.HTMLAttributes<HTMLButtonElement> {
  title?: string;
  effectHandler?: any;
  effectIcon?: string;
  effectImg?: string;
  isController?: boolean;
  active?: boolean;
  deepAr?: MutableRefObject<DeepAR | null>;
  onClick?: (event: any) => void; // to handle onClick functions
}

export const Effect = ({
  title,
  effectIcon,
  effectHandler,
  isController = false,
  effectImg,
  active = false,
  deepAr,
  ...props
}: EffectProps) => {
  return (
    <StyledEffect
      active={active}
      {...props}
      onClick={() => {
        if (effectHandler) {
          effectHandler();
        }
      }}
    >
      {!active || !isController ? (
        <>
          {title && (
            <Paragraph style={{ padding: "2px 0" }} size="sm">
              {title}
            </Paragraph>
          )}

          {effectImg && (
            <StyledImage
              style={{ width: "auto", maxHeight: 35, objectFit: "contain" }}
              src={getImageUrl(effectImg)}
            />
          )}
          {effectIcon && (
            <IconSprite
              style={{ width: 20, height: 20, objectFit: "contain" }}
              iconName={`${effectIcon}`}
            />
          )}
        </>
      ) : null}

      {active && isController ? <IconSprite iconName="controls/arrow" /> : null}
    </StyledEffect>
  );
};
