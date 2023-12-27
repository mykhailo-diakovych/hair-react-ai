import React from "react";
import { PreviewImage } from "@features/simulation/preview/components/PreviewImage/PreviewImage";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const PreviewOriginalImage = ({
  src,
  isMobile = false
}: {
  src?: string;
  isMobile?: boolean;
}) => {
  return (
    <FlexGroup column gap={16}>
      {!isMobile && (
        <FlexGroup
          bg={"mineshaft700"}
          compact
          center
          centerY
          style={{ padding: 8, height: 47 }}
        >
          <Paragraph size={"lg"} color={"gray7"}>
            Original image
          </Paragraph>
        </FlexGroup>
      )}

      <PreviewImage src={src} />
    </FlexGroup>
  );
};
