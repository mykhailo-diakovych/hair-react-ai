import React from "react";
import Lottie from "lottie-react";
import { ConditionalWrapper } from "@helpers/conditionalWrapper";
import { Portal } from "@components/Portal/Portal";
import { StyledLoader } from "@components/Loader/styled/Loader.styled";
import Animation from "@assets/lottie/loader_animation.json";

export const Loader = ({
  selector = "#root"
}: {
  selector?: string;
}): JSX.Element => {
  return (
    <ConditionalWrapper
      wrapper={(children) => {
        return !selector ? (
          <>{children}</>
        ) : (
          <Portal selector={selector}>{children}</Portal>
        );
      }}
    >
      <StyledLoader>
        <Lottie className="loader" animationData={Animation} loop={true} />
      </StyledLoader>
    </ConditionalWrapper>
  );
};
