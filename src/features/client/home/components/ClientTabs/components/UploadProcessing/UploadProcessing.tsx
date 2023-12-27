import React, { useContext } from "react";
import { ProcessingImage } from "@features/client/home/components/ClientTabs/components/UploadProcessing/components/ProcessingImage/ProcessingImage";
import { ClientTabHeader } from "@features/client/home/components/ClientTabs/components/shared/ClientTabHeader/ClientTabHeader";
import { ClientTabsContext } from "@features/client/home/components/ClientTabs/ClientTabs.context";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const UploadProcessing = () => {
  const { image } = useContext(ClientTabsContext);

  return (
    <FlexGroup gap={32} alignItems={"start"}>
      <GroupItems column>
        <ClientTabHeader header={"Original Photo"} />

        <StyledImage src={image?.image} imageStyles={{ aspectRatio: "3/4" }} />
      </GroupItems>

      <GroupItems column>
        <ClientTabHeader header={"Simulation"} />

        <ProcessingImage />
      </GroupItems>
    </FlexGroup>
  );
};
