import { useCopyToClipboard } from "usehooks-ts";
import React, { useEffect, useRef, useState } from "react";
import { InputRef } from "antd";
import { ClinicFull } from "@services/Clinic/interfaces/Clinic.interface";
import { useUpdateClinicMutation } from "@hooks/query/clinic/useUpdateClinicMutation";
import { Toast } from "@helpers/toast";
import { getCaptureLink } from "@helpers/getAppUrls/getCaptureLink";
import { SettingsGroup } from "@features/clinic/settings/components/shared/styled/SettingsGroup.styled";
import { SettingsInput } from "@features/clinic/settings/components/LeadSettingsTab/styled/SettingsInput.styled";
import { LeadSettingsOption } from "@features/clinic/settings/components/LeadSettingsTab/components/LeadSettingsOption/LeadSettingsOption";
import { queryClient } from "@config/query";
import { API_SERVICES, BASIC_VALIDATORS } from "@config/constants";
import { Spinner } from "@components/Spinner/styled/Spinner.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { CodeBlock } from "@components/CodeBlock/CodeBlock";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

export const LeadSettingsTab = ({ clinic }: { clinic?: ClinicFull | null }) => {
  const captureLinkRef = useRef<InputRef>(null);
  const [, copyToClipboard] = useCopyToClipboard();
  const widgetCodeRef = useRef<any>(null);
  const [leadEmail, setLeadEmail] = useState<string>("");

  const [phoneRequired, setPhoneRequired] = useState<boolean>(
    clinic?.phone_required || false
  );
  const [autoEmailPatient, setAutoEmailPatient] = useState<boolean>(
    clinic?.auto_email_patient || false
  );
  const [websiteUrl, setLeadWebsiteUrl] = useState<string>("");

  const isLeadCaptureFormChanged =
    (leadEmail && leadEmail !== clinic?.leads_email) ||
    (websiteUrl && websiteUrl !== clinic?.website_url);

  const updateClinic = useUpdateClinicMutation();

  const handleClickCopyLeadCaptureLink = async () => {
    const captureLink = captureLinkRef.current?.input?.value;

    if (captureLink) {
      await copyToClipboard(captureLink);
      Toast.success("Lead capturing link has been copied!");
    }
  };

  const handleClickCopyWidgetCode = async () => {
    const widgetCode = (widgetCodeRef?.current as Element)?.textContent || "";

    if (widgetCode) {
      await copyToClipboard(widgetCode);
      Toast.success("Widget code has been copied!");
    }
  };

  const handleChangeLeadContact = async () => {
    if (clinic) {
      const isValidEmail = BASIC_VALIDATORS.email.test(leadEmail);

      if (!isValidEmail) {
        Toast.error("Please enter a valid email address");
        return;
      }

      updateClinic(
        {
          id: clinic.id,
          phone_required: phoneRequired,
          auto_email_patient: autoEmailPatient,
          leads_email: leadEmail,
          ...(websiteUrl ? { website_url: websiteUrl } : [])
        },
        {
          onSuccess: () => {
            Toast.success("Lead contact settings have been updated!");

            queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey.includes(API_SERVICES.CLINIC.invalidationKey)
            });
          },
          onError: (e: any) => {
            const values: string[][] = Object.values(e.response.data);

            for (const valueArray of values) {
              for (const value of valueArray) {
                Toast.error(value as string);
              }
            }
          }
        }
      );
    }
  };

  useEffect(() => {
    if (clinic) {
      setPhoneRequired(clinic.phone_required || false);
      setAutoEmailPatient(clinic.auto_email_patient || false);
      setLeadEmail(clinic.leads_email || clinic.email || "");
      setLeadWebsiteUrl(clinic.website_url || "");
    }
  }, [clinic]);

  if (!clinic) {
    return <Spinner />;
  }

  return (
    <GroupItems
      style={{
        maxWidth: 500
      }}
      gap={24}
    >
      <SettingsGroup>
        <Paragraph>Lead capture</Paragraph>

        <GroupItems>
          <SettingsInput
            value={leadEmail}
            name={"leadEmail"}
            label={"Lead email"}
            onChange={(e: any) => {
              setLeadEmail(e.target.value);
            }}
          />

          <SettingsInput
            value={websiteUrl}
            name={"websiteUrl"}
            label={"Lead website url"}
            onChange={(e: any) => {
              setLeadWebsiteUrl(e.target.value);
            }}
          />

          <SettingsInput
            innerRef={captureLinkRef}
            value={getCaptureLink(clinic?.id)}
            name={"captureLink"}
            label={"Lead capture link"}
            labelExtraContent={
              <FlexGroup compact>
                <ButtonText
                  onClick={() => handleClickCopyLeadCaptureLink()}
                  color={"malibuLight"}
                >
                  <Paragraph size={"lg"} mr={10}>
                    Copy link
                  </Paragraph>

                  <IconSprite
                    iconName={"common/link"}
                    style={{ width: 16, height: 16 }}
                  />
                </ButtonText>
              </FlexGroup>
            }
            disabled
          />

          {isLeadCaptureFormChanged ? (
            <ButtonPrimary
              onClick={() => {
                handleChangeLeadContact();
              }}
            >
              Save changes
            </ButtonPrimary>
          ) : null}
        </GroupItems>
      </SettingsGroup>

      <SettingsGroup>
        <Paragraph>Patient contact</Paragraph>

        <GroupItems>
          <LeadSettingsOption
            iconName={"common/phone"}
            title={"Phone required"}
            switchValue={phoneRequired}
            onSwitchChange={(state) => {
              setPhoneRequired(state);
            }}
          />

          <LeadSettingsOption
            iconName={"common/mail"}
            title={"Auto email patient"}
            switchValue={autoEmailPatient}
            onSwitchChange={(state) => {
              setAutoEmailPatient(state);
            }}
          />
        </GroupItems>

        {(autoEmailPatient !== clinic?.auto_email_patient ||
          phoneRequired !== clinic?.phone_required) && (
          <ButtonPrimary
            onClick={() => {
              handleChangeLeadContact();
            }}
          >
            Save changes
          </ButtonPrimary>
        )}
      </SettingsGroup>

      <SettingsGroup>
        <FlexGroup spread>
          <Paragraph>Widget code</Paragraph>

          <ButtonText
            onClick={() => handleClickCopyWidgetCode()}
            color={"malibuLight"}
          >
            <FlexGroup gap={10}>
              Copy code
              <IconSprite
                iconName={"common/link"}
                style={{ width: 16, height: 16 }}
              />
            </FlexGroup>
          </ButtonText>
        </FlexGroup>

        <CodeBlock
          ref={widgetCodeRef}
          text={`
            <script>
              window._WIDGET_SETTINGS = {
                showTimeout: 3000,
                hideTimeout: 10000,
                // 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
                position: "bottomLeft",
                appUrl: "https://${import.meta.env.VITE_BASE_HOST}/client/${
            clinic?.id
          }",
                // parentNodeSelector: "body"
              };
        
              const script_tag = document.createElement('script');
              script_tag.setAttribute('src', '${
                import.meta.env.VITE_WIDGET_SCRIPT_URL
              }');
              script_tag.setAttribute('type','text/javascript');
              script_tag.setAttribute('defer', true);
        
              document.head.appendChild(script_tag);
            </script>
          `}
        />

        <Paragraph mb={10} size={"lg"} flexCenter>
          <IconSprite width={16} height={16} iconName="common/info" />
          Place it in the header of your website
        </Paragraph>
      </SettingsGroup>
    </GroupItems>
  );
};
