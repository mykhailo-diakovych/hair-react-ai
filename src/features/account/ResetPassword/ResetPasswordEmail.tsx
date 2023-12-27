import React, { useState } from "react";
import { AuthenticationLayout } from "@features/authentication/shared/layout/AuthenticationLayout";
import { ResetPasswordEmailForm } from "@features/account/ResetPassword/components/ResetPasswordEmailForm/ResetPasswordEmailForm";
import { Theme } from "@components/Theme/Theme";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Modal } from "@components/Modal/styled/Modal.styled";

export const ResetPasswordEmail = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const onFormSubmitted = () => {
    setIsEmailSent(true);
    setShowSuccessPopup(true);
  };

  return (
    <>
      <AuthenticationLayout title={"Reset password"}>
        <ResetPasswordEmailForm
          onFormSubmitted={onFormSubmitted}
          isEmailSent={isEmailSent}
        />
      </AuthenticationLayout>

      {showSuccessPopup && (
        <Theme darkMode={true}>
          <Modal
            title={"Email instructions sent successfully"}
            isOpen={showSuccessPopup}
            setIsOpen={setShowSuccessPopup}
            maxWidth={440}
          >
            <Paragraph>
              We have sent you an email with instructions on how to reset your
              password.
            </Paragraph>
          </Modal>
        </Theme>
      )}
    </>
  );
};
