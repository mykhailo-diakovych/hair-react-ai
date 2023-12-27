import { v4 } from "uuid";
import { useTheme } from "styled-components";
import React, { useRef, useState } from "react";
import { RcFile } from "antd/es/upload";
import { Upload, UploadFile, UploadProps } from "antd";
import { UploadButtonContent } from "@components/UploadButton/styled/UploadButtonContent.styled";
import { StyledUploadButton } from "@components/UploadButton/styled/UploadButton.styled";
import { Spinner } from "@components/Spinner/styled/Spinner.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { IImageProps } from "@components/Image/Image";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

interface AfterUploadProps {
  image: string;
  files: UploadFile<any>[];
}

interface IUploadButtonProps {
  id?: string;
  buttonText?: React.ReactNode;
  imageWrapperStyles?: React.CSSProperties;
  buttonBeforeIconContent?: React.ReactNode;
  buttonIcon?: string;
  buttonIconStyles?: React.CSSProperties;
  buttonEmptyProps?: React.HTMLAttributes<HTMLDivElement>;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;
  imageProps?: IImageProps;
  uploadButtonProps?: UploadProps;
  onAfterUpload?: (upload: AfterUploadProps) => any | void;
  additionalContent?: React.ReactNode;
  clearUploaded?: () => void;
  activeButton?: string;
  setActiveButton?: React.Dispatch<React.SetStateAction<string>>;
  isError?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  placeholderImage?: string;
  disableDoubleClickUpload?: boolean;
}

export const useUploadButton = ({
  id = v4(),
  buttonText,
  imageWrapperStyles,
  buttonBeforeIconContent,
  buttonIcon = "button/upload",
  buttonIconStyles,
  buttonProps,
  imageProps,
  buttonEmptyProps,
  uploadButtonProps,
  onAfterUpload,
  additionalContent,
  activeButton,
  setActiveButton,
  isError,
  isLoading = false,
  placeholderImage,
  errorMessage
}: IUploadButtonProps) => {
  const theme = useTheme();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [imagePreview, setImagePreview] = useState("");

  const onChange: UploadProps["onChange"] = ({
    fileList,
    file
  }: {
    file: any;
    fileList: UploadFile[];
  }) => {
    setFiles(fileList || []);

    if (file.status !== "removed") {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64Image = reader.result;

        setImagePreview(base64Image as string);

        if (onAfterUpload) {
          onAfterUpload({
            files: fileList,
            image: base64Image as string
          });
        }
      };
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const clearUploaded = () => {
    console.log("Clear uploaded images");
    setImagePreview("");
    setFiles([]);
  };

  const updateImagePreview = (image: string) => {
    setImagePreview(image);
  };

  const [nativeEvent, setNativeEvent] = useState(null);
  const isDoubleClick = useRef(false);

  return {
    files: files,
    clearUploaded,
    updateImagePreview,
    component: (
      <Upload
        accept="image/png, image/jpeg, image/webp"
        listType="picture-card"
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={() => false}
        {...uploadButtonProps}
      >
        <FlexGroup column>
          <StyledUploadButton
            $hasImage={!!imagePreview}
            $isActive={activeButton === id}
            $isError={isError}
            $placeholderImage={placeholderImage}
            onClick={(e: any) => {
              if (setActiveButton && imagePreview) {
                setActiveButton(id);
              }

              if (!isDoubleClick.current && !!imagePreview && !isError) {
                e.stopPropagation();
              }

              setNativeEvent(e);
              isDoubleClick.current = false;
            }}
            onDoubleClick={(e: any) => {
              isDoubleClick.current = true;

              if (nativeEvent) {
                e.target.dispatchEvent(new MouseEvent("click", nativeEvent));
              }
            }}
            {...buttonProps}
          >
            {imagePreview && (
              <FlexGroup
                style={{ height: "100%", ...imageWrapperStyles }}
                column
              >
                <StyledImage
                  src={imagePreview}
                  imageStyles={imageProps?.imageStyles || {}}
                  {...imageProps}
                />

                {isLoading ? (
                  <Spinner style={{ transform: "translate(0, 0)" }} />
                ) : (
                  additionalContent
                )}
              </FlexGroup>
            )}

            {imagePreview && !isError ? null : (
              <UploadButtonContent center centerY column {...buttonEmptyProps}>
                {isError ? (
                  <Paragraph
                    level={2}
                    style={{
                      maxWidth: 220,
                      fontSize: 18,
                      whiteSpace: "initial",
                      textAlign: "center",
                      lineHeight: 1.5
                    }}
                    color={theme.colors.red}
                  >
                    {errorMessage}
                  </Paragraph>
                ) : (
                  buttonBeforeIconContent
                )}

                <IconSprite
                  iconName={isError ? "common/broken-image" : buttonIcon}
                  style={{
                    width: isError ? 84 : 40,
                    height: isError ? 84 : 40,
                    padding: 10,
                    borderRadius: 8,
                    margin: "0 auto 0",
                    ...buttonIconStyles
                  }}
                />

                {buttonText && (
                  <Paragraph fontWeight={500} color={"dovegray"} size={"md"}>
                    {buttonText}
                  </Paragraph>
                )}
              </UploadButtonContent>
            )}
          </StyledUploadButton>
        </FlexGroup>
      </Upload>
    )
  };
};
