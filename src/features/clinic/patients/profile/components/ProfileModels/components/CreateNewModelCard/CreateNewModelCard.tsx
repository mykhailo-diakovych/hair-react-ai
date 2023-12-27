import React, { useState } from "react";
import { Tooltip } from "antd";
import {
  StyledCreateNewModelArea,
  StyledCreateNewModelCard,
  StyledNewModelTip
} from "@features/clinic/patients/profile/components/ProfileModels/components/CreateNewModelCard/styled/CreateNewModelCard.styled";
import { CreateNewModel } from "@features/clinic/patients/profile/components/CreateNewModel/CreateNewModel";
import { queryClient } from "@config/query";
import { API_SERVICES } from "@config/constants";
import { Theme } from "@components/Theme/Theme";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Modal } from "@components/Modal/styled/Modal.styled";
import { IconSprite } from "@components/Icon/IconSprite";

export const CreateNewModelCard = () => {
  const [showCreateNewModel, setShowCreateNewModel] = useState(false);

  return (
    <StyledCreateNewModelCard as={"article"}>
      <StyledCreateNewModelArea onClick={() => setShowCreateNewModel(true)}>
        <Paragraph>Create a model</Paragraph>
      </StyledCreateNewModelArea>

      <StyledNewModelTip
        size={"md"}
        center
        flexCenter
        style={{ fontWeight: 500, width: "100%" }}
      >
        <Tooltip placement="top" title={"Create a new model"}>
          <IconSprite width={16} height={16} iconName="common/info" />
        </Tooltip>
        Create a model and generate simulation
      </StyledNewModelTip>

      <Theme darkMode>
        <Modal
          isOpen={showCreateNewModel}
          setIsOpen={(isOpen: boolean) => {
            queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey.includes(API_SERVICES.PATIENTS.invalidationKey)
            });

            setShowCreateNewModel(isOpen);
          }}
          title={"Create new model"}
        >
          <CreateNewModel
            closeModal={() => {
              setShowCreateNewModel(false);
            }}
          />
        </Modal>
      </Theme>
    </StyledCreateNewModelCard>
  );
};
