import React from "react";
import { Modal as AntModal, ModalProps as AntModalProps } from "antd";
import { Title } from "@components/Title/Title";
import { IconSprite } from "@components/Icon/IconSprite";

interface ModalProps extends AntModalProps {
  isOpen?: boolean;
  setIsOpen: (state: boolean) => any | void;
  handleOk?: () => any | void;
  handleCancel?: () => any | void;
  children: React.ReactNode;
  clickOutsideToClose?: boolean;
  showCloseIcon?: boolean;
  [key: string]: any;
}

export const ModalBase = ({
  isOpen = false,
  setIsOpen,
  title,
  handleOk,
  handleCancel,
  rootClassName,
  confirmLoading,
  children,
  showCloseIcon = true,
  ...props
}: ModalProps) => {
  return (
    <AntModal
      open={isOpen}
      rootClassName={rootClassName}
      title={<Title level={2}>{title}</Title>}
      centered={true}
      confirmLoading={confirmLoading}
      onCancel={() => {
        if (handleCancel) {
          handleCancel();
        }
        setIsOpen(false);
      }}
      onOk={() => {
        if (handleOk) {
          handleOk();
        }
      }}
      closeIcon={
        showCloseIcon ? (
          <IconSprite
            style={{ width: 20, height: 20 }}
            iconName="common/cross"
          />
        ) : null
      }
      footer={null}
      {...props}
    >
      {children}
    </AntModal>
  );
};
