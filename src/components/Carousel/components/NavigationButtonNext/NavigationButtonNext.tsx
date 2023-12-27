import { useTheme } from "styled-components";
import React from "react";
import { IconSprite } from "@components/Icon/IconSprite";
import { NavigationButton } from "@components/Carousel/components/shared/styled/NavigationButton.styled";
import { NavigationButtonProps } from "@components/Carousel/components/shared/interface/NavigationButtonProps.interface";

export const NavigationButtonNext = ({
  innerRef,
  ...props
}: NavigationButtonProps) => {
  const theme = useTheme();

  return (
    <NavigationButton
      ref={innerRef}
      className={"swiper-navigation-next"}
      color={theme.colors.malibuLight}
      {...props}
    >
      Next
      <IconSprite
        iconName={"pagination/arrow-right"}
        style={{
          width: 24,
          height: 24,
          padding: 4,
          marginRight: 10
        }}
      />
    </NavigationButton>
  );
};
