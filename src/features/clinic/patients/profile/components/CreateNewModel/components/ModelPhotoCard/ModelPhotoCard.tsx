import styled from "styled-components";
import React from "react";
import { Skeleton } from "antd";
import { getImageUrl } from "@helpers/getImageUrl";
import { ISelectedListItem } from "@features/clinic/patients/profile/components/CreateNewModel/CreateNewModel";
import { ModelPhotoCardTooltip } from "@features/clinic/patients/profile/components/CreateNewModel/components/ModelPhotoCard/styled/ModelPhotoCardTooltip.styled";
import { StyledModelPhotoCard } from "@features/clinic/patients/profile/components/CreateNewModel/components/ModelPhotoCard/styled/ModelPhotoCard.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Checkbox } from "@components/Checkbox/styled/Checkbox.styled";

interface IModelPhotoCardProps {
  photoCard: ISelectedListItem;
  selectedList: ISelectedListItem[];
  setSelectedList: (item: ISelectedListItem[]) => void | any;
  onChange?: (item: ISelectedListItem, state: boolean) => void | any;
}

export function ModelPhotoCard({
  selectedList,
  setSelectedList,
  photoCard
}: IModelPhotoCardProps) {
  const handleChangeSelectedModelPhotoCard = (state: boolean) => {
    const isItemPresent = selectedList.some((selectedItem) => {
      return selectedItem.id === photoCard.id;
    });

    if (isItemPresent) {
      setSelectedList(
        selectedList.map((selectedItem) => {
          return selectedItem.id === photoCard.id
            ? {
                ...photoCard,
                checked: state
              }
            : selectedItem;
        })
      );
    } else {
      setSelectedList([
        ...selectedList,
        {
          ...photoCard,
          checked: state
        }
      ]);
    }
  };

  return (
    <StyledModelPhotoCard compact column gap={0}>
      {photoCard?.image ? (
        <FlexGroup style={{ position: "relative" }}>
          <StyledImage
            imageStyles={{
              aspectRatio: "3/4",
              ...(photoCard?.isOriginal ? { filter: "grayscale(0.7)" } : {})
            }}
            src={photoCard?.image || getImageUrl("simulation.jpg")}
          />

          {photoCard?.isOriginal ? (
            <ModelPhotoCardTooltip
              placement="bottom"
              getPopupContainer={() =>
                document.querySelector(".create-new-model") || document.body
              }
              title={<Paragraph>To select this photo, first crop it</Paragraph>}
            >
              <IconSprite width={16} height={16} iconName="common/info" />
            </ModelPhotoCardTooltip>
          ) : null}
        </FlexGroup>
      ) : (
        <Skeleton.Image
          style={{
            width: "100%",
            aspectRatio: "3/4"
          }}
          active
        />
      )}

      <ModelPhotoCard.Footer compact>
        <Checkbox
          checked={photoCard.checked}
          disabled={photoCard?.isOriginal}
          onClick={(e: any) => {
            e.target.closest(".ant-modal-wrap").scrollTo({
              top: 0
            });
          }}
          onChange={(e: any) => {
            e.target.closest(".ant-modal-wrap").scrollTo({
              top: 0
            });

            handleChangeSelectedModelPhotoCard(e.target.checked);
          }}
        />
      </ModelPhotoCard.Footer>
    </StyledModelPhotoCard>
  );
}

ModelPhotoCard.Footer = styled(FlexGroup)`
  padding: 12px;
  background-color: ${(props) => props.theme.colors.mineshaft800};
`;
