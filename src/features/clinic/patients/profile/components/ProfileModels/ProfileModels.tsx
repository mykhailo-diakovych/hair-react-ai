import React, { useRef } from "react";
import { Patient } from "@services/Patients/interfaces/Patient.interface";
import { ProfileModelsWrapper } from "@features/clinic/patients/profile/components/ProfileModels/styled/ProfileModelsWrapper.styled";
import { ProfileModelCard } from "@features/clinic/patients/profile/components/ProfileModels/components/ProfileModelCard/styled/ProfileModelCard.styled";
import { CreateNewModelCard } from "@features/clinic/patients/profile/components/ProfileModels/components/CreateNewModelCard/CreateNewModelCard";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { NavigationButtonPrev } from "@components/Carousel/components/NavigationButtonPrev/NavigationButtonPrev";
import { NavigationButtonNext } from "@components/Carousel/components/NavigationButtonNext/NavigationButtonNext";
import { Carousel } from "@components/Carousel/Carousel";

export const ProfileModels = ({
  patient,
  selectedModelId,
  setSelectedModelId
}: {
  patient?: Patient;
  selectedModelId: string;
  setSelectedModelId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const activeProfileModels =
    patient?.patientModels.filter((model) => model.is_active) || [];

  const navigationPrevElRef = useRef<HTMLButtonElement>(null);
  const navigationNextElRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <ProfileModelsWrapper
        column
        $shrinkModels={activeProfileModels.length === 1}
        gap={0}
      >
        {activeProfileModels.length === 0 && <CreateNewModelCard />}

        <Carousel
          items={activeProfileModels?.map((model, index) => ({
            id: model.id,
            children: (
              <ProfileModelCard
                key={model.id}
                model={model}
                patient={patient}
                selected={
                  selectedModelId ? selectedModelId === model.id : index === 0
                }
                setSelectedModelId={setSelectedModelId}
              />
            )
          }))}
          itemsPerView={3}
          navigation={{
            prevEl: navigationPrevElRef,
            nextEl: navigationNextElRef
          }}
          containerProps={{
            style: {
              padding: 0,
              maxWidth: "100%"
            }
          }}
          swiperProps={{
            breakpoints: {
              5920: {
                slidesPerView: 4
              },
              1440: {
                slidesPerView: 4
              },
              1100: {
                slidesPerView: 3
              },
              640: {
                slidesPerView: 2
              },
              0: {
                slidesPerView: 1
              }
            }
          }}
        />
      </ProfileModelsWrapper>

      {activeProfileModels.length > 0 && (
        <FlexGroup flexWrap={"wrap"} spread centerY>
          <Paragraph size={"lg"}>
            Total: {activeProfileModels.length} models
          </Paragraph>

          <FlexGroup centerY compact gap={24}>
            <NavigationButtonPrev innerRef={navigationPrevElRef} />
            <NavigationButtonNext innerRef={navigationNextElRef} />
          </FlexGroup>
        </FlexGroup>
      )}
    </>
  );
};
