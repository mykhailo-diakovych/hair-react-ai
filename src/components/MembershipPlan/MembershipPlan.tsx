import React from "react";
import { Plan } from "@services/Plan/interfaces/Plan.interface";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledMembershipPlan } from "@components/MembershipPlan/styled/MembershipPlan.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

interface MembershipPlanProps {
  plan?: Plan | null;
  isSelected?: boolean;
  onSelectPlan: (selectedId?: string) => void | any;
  buttonText?: string;
}

export const MembershipPlan = ({
  plan,
  isSelected = false,
  onSelectPlan,
  buttonText = "Select"
}: MembershipPlanProps) => {
  const privileges = plan?.description.split("\r\n");

  return (
    <StyledMembershipPlan $isSelected={isSelected}>
      <FlexGroup compact column>
        <FlexGroup spread>
          <Paragraph style={{ fontWeight: 700 }} as={"h3"}>
            <FlexGroup gap={10} centerY>
              <IconSprite
                style={{
                  ...(isSelected
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        transform: "scale(0)",
                        marginLeft: -30
                      }),
                  transition: "opacity 0.3s, transform 0.3s, margin 0.3s"
                }}
                iconName={"membership/current-plan"}
              />

              {plan?.name}
            </FlexGroup>
          </Paragraph>

          <Paragraph fontWeight={700}>£ {plan?.monthly_price}/month</Paragraph>
        </FlexGroup>

        <FlexGroup gap={8} column>
          {privileges?.map((privilege: string) => (
            <FlexGroup gap={10} centerY key={privilege}>
              <IconSprite
                style={{ width: 10, height: 10 }}
                iconName={"input/checkmark"}
              />

              <Paragraph size="lg">{privilege}</Paragraph>
            </FlexGroup>
          ))}
        </FlexGroup>

        {!isSelected && (
          <ButtonPrimary
            onClick={() => onSelectPlan(plan?.id)}
            style={{ alignSelf: "start" }}
          >
            {buttonText}
          </ButtonPrimary>
        )}
      </FlexGroup>
    </StyledMembershipPlan>
  );
};
