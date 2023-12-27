import { v4 } from "uuid";
import { useTheme } from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { TabsProps } from "antd";
import { CreatePatientResponse } from "@services/Patients/interfaces/createPatientResponse.interface";
import { UploadImageResponse } from "@services/Files/interfaces/UploadImageResponse.interface";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useDeepAr } from "@hooks/useDeepAr";
import { ConditionalWrapper } from "@helpers/conditionalWrapper";
import { UploadPhoto } from "@features/clinic/patients/profile/components/UploadPhotoCard/UploadPhotoCard";
import { StyledClientTabs } from "@features/client/home/components/ClientTabs/styled/ClientTabs.styled";
import { useSetTabStep } from "@features/client/home/components/ClientTabs/hooks/useSetTabStep";
import { UploadProcessing } from "@features/client/home/components/ClientTabs/components/UploadProcessing/UploadProcessing";
import { UploadPhotoTab } from "@features/client/home/components/ClientTabs/components/UploadPhotoTab/UploadPhotoTab";
import { ClientTabsContext } from "@features/client/home/components/ClientTabs/ClientTabs.context";
import { Tabbar } from "@components/Tabs/components/Tabbar/Tabbar";
import { Spinner } from "@components/Spinner/styled/Spinner.styled";
import { Portal } from "@components/Portal/Portal";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { DeepArCanvas } from "@components/DeepArCanvas/DeepArCanvas";

export const ClientTabs = ({ className, ...props }: { className?: string }) => {
  const [image, setImage] = useState({
    id: v4(),
    image: ""
  });
  const [isSimulationReady, setIsSimulationReady] = useState(false);

  const [croppedImage, setCroppedImage] = useState<UploadPhoto>({
    id: v4(),
    image: "",
    parent: ""
  });
  const [parentImage, setParentImage] = useState<UploadImageResponse | null>(
    null
  );
  const [originalImage, setOriginalImage] =
    useState<UploadImageResponse | null>(null);
  const [imageWithEffect, setImageWithEffect] =
    useState<UploadImageResponse | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { deepAr, loading: isDeepArLoading } = useDeepAr(canvasRef, true);
  const [croppedData, setCroppedImageData] = useState<ImageData | undefined>();

  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);

  const [leadPatient, setLeadPatient] = useState<CreatePatientResponse>();

  const [isOpenContactInfoModal, setIsOpenContactInfoModal] = useState(false);
  const { updateTab, next: nextStep } = useSetTabStep({ tabsName: "sim-step" });

  const userTabs = [
    {
      label: <Paragraph size={"lg"}>Upload</Paragraph>,
      key: "1",
      children: <UploadPhotoTab image={image} setImage={setImage} />
    },
    {
      label: (
        <Paragraph
          size={"lg"}
          onClick={(e) => {
            const currentStep = new URLSearchParams(location.search).get(
              "sim-step"
            ) as string;

            if (parseInt(currentStep) === 2) {
              e.stopPropagation();
              setIsOpenContactInfoModal(true);
            } else if (image?.image && parseInt(currentStep) === 1) {
              nextStep();
            }
          }}
        >
          Submit
        </Paragraph>
      ),
      disabled: !image?.image,
      key: "2",
      children: <UploadProcessing />
    }
  ];

  const renderTabBarItems: TabsProps["renderTabBar"] = (
    props,
    DefaultTabBar
  ) => {
    return (
      <ConditionalWrapper
        wrapper={(children) =>
          !isMobile ? (
            <Portal selector={".header-tabbar"}>{children}</Portal>
          ) : (
            <>{children}</>
          )
        }
      >
        <Tabbar
          DefaultTabBar={DefaultTabBar}
          tabBarProps={props}
          style={{ margin: 0 }}
        />
      </ConditionalWrapper>
    );
  };

  useEffect(() => {
    updateTab(1);
  }, []);

  return (
    <>
      <DeepArCanvas
        deepAr={deepAr}
        isDeepArLoading={isDeepArLoading}
        imageData={croppedData}
        ref={canvasRef}
        className={"visually-hidden"}
      />

      {isDeepArLoading && <Spinner />}

      <ClientTabsContext.Provider
        value={{
          canvasRef,
          deepAr,
          isDeepArLoading,
          croppedData,
          setCroppedImageData,
          image,
          setImage,
          croppedImage,
          setCroppedImage,
          isSimulationReady,
          setIsSimulationReady,
          parentImage,
          setParentImage,
          originalImage,
          setOriginalImage,
          imageWithEffect,
          setImageWithEffect,
          leadPatient,
          setLeadPatient,
          isOpenContactInfoModal,
          setIsOpenContactInfoModal
        }}
      >
        <StyledClientTabs
          wrapperClassName={cn(className, "client-tabs__container")}
          className="client-tabs"
          items={userTabs}
          tabSearchParam={"sim-step"}
          renderTabBar={renderTabBarItems}
          {...props}
        />
      </ClientTabsContext.Provider>
    </>
  );
};
