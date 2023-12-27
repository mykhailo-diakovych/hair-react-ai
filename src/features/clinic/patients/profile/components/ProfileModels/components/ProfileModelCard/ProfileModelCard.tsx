import { useTheme } from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Skeleton } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { Patient } from "@services/Patients/interfaces/Patient.interface";
import { Model } from "@services/Model/interfaces/Model.interface";
import { useUpdateModelMutation } from "@hooks/query/model/useUpdateModelMutation";
import { useGetImageUrlQuery } from "@hooks/query/image/useGetImageUrlQuery";
import { DEFAULT_TOAST_OPTIONS, Toast } from "@helpers/toast";
import {
  ProfileModelCardAction,
  ProfileModelCardActions
} from "@features/clinic/patients/profile/components/ProfileModels/components/ProfileModelCard/styled/ProfileModelCardActions.styled";
import { API_SERVICES, ROUTES } from "@config/constants";
import { Title } from "@components/Title/Title";
import { Theme } from "@components/Theme/Theme";
import { Popover } from "@components/Popover/Popover";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

interface ProfileModelCardProps {
  selected?: boolean;
  patient?: Patient;
  model: Model;
  setSelectedModelId: React.Dispatch<React.SetStateAction<string>>;
}

export const ProfileModelCardBase = ({
  selected,
  model,
  setSelectedModelId,
  ...props
}: ProfileModelCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showMoreActions, setShowMoreActions] = useState(false);

  const updateModelMutation = useUpdateModelMutation();

  const queryClient = useQueryClient();

  const handleClickEditSimulation = () => {
    navigate(ROUTES.EDIT_SIMULATION_BY_ID(model.id));
  };

  const handleConfirmDeleteModel = () => {
    setShowMoreActions(false);
    updateModelMutation(
      { ...model, is_active: false },
      {
        onSuccess: () => {
          Toast.success("Model deleted successfully");

          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey.includes(API_SERVICES.PATIENTS.invalidationKey)
          });
        }
      }
    );
  };

  const showModelDeleteToast = () => {
    const toastId = toast(
      <GroupItems>
        <Paragraph>Are you sure want to delete model?</Paragraph>

        <FlexGroup center centerY>
          <ButtonPrimaryOutlined
            onClick={() => {
              toast.dismiss(toastId);
            }}
            color={"#fff"}
            style={{ width: "auto", fontWeight: 400 }}
          >
            Cancel
          </ButtonPrimaryOutlined>

          <ButtonPrimary
            onClick={() => {
              handleConfirmDeleteModel();
            }}
          >
            Delete
          </ButtonPrimary>
        </FlexGroup>
      </GroupItems>,
      DEFAULT_TOAST_OPTIONS
    );
  };

  const { data } = useGetImageUrlQuery(
    model?.modelImages?.at(0)?.image as string,
    true
  );
  const modelImage = data?.image || "";

  useEffect(() => {
    if (selected) {
      setSelectedModelId(model.id);
    }
  }, [selected]);

  return (
    <FlexGroup
      onClick={() => {
        setSelectedModelId(model.id);
      }}
      {...props}
    >
      {modelImage ? (
        <StyledImage
          style={{
            flex: "1 0 88px",
            borderRadius: 8,
            overflow: "hidden"
          }}
          src={modelImage}
        />
      ) : (
        <Skeleton.Image
          style={{
            flex: "1 0 88px",
            borderRadius: 8,
            overflow: "hidden"
          }}
          active
        />
      )}

      <GroupItems>
        <FlexGroup alignSelf={"start"} compact spread>
          <FlexGroup column gap={5}>
            <Paragraph size={"lg"} $uppercase>
              Title:
            </Paragraph>

            <Title level={3}>{model?.name}</Title>
          </FlexGroup>

          <Popover
            open={showMoreActions}
            placement="bottomRight"
            content={
              <ProfileModelCardActions>
                <ProfileModelCardAction
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleClickEditSimulation();
                  }}
                >
                  <FlexGroup centerY>
                    <IconSprite
                      style={{ width: 16, height: 16 }}
                      iconName="button/edit"
                    />
                    <Paragraph size={"lg"}>Edit</Paragraph>
                  </FlexGroup>
                </ProfileModelCardAction>

                <ProfileModelCardAction
                  onClick={(e: any) => {
                    e.stopPropagation();
                    showModelDeleteToast();
                  }}
                >
                  <FlexGroup centerY>
                    <IconSprite
                      style={{ width: 16, height: 16 }}
                      iconName="button/garbage"
                    />
                    <Paragraph size={"lg"}>Delete</Paragraph>
                  </FlexGroup>
                </ProfileModelCardAction>
              </ProfileModelCardActions>
            }
            onOpenChange={setShowMoreActions}
            trigger="click"
            rootClassName="widget-popover"
          >
            <ButtonIcon
              iconName="button/dots"
              iconStyle={{ width: 20, height: 20 }}
              onClick={(e: any) => {
                e.stopPropagation();
              }}
            />
          </Popover>
        </FlexGroup>

        <Theme style={{ alignSelf: "end" }} darkMode={true}>
          <ButtonText
            color={theme.colors.malibuLight}
            $color={theme.colors.malibuLight}
            onClick={() => handleClickEditSimulation()}
          >
            Enter model{" "}
            <IconSprite
              iconName={"common/chevron-right"}
              style={{
                color: theme.colors.malibuLight,
                width: 16,
                height: 16
              }}
            />
          </ButtonText>
        </Theme>
      </GroupItems>
    </FlexGroup>
  );
};
