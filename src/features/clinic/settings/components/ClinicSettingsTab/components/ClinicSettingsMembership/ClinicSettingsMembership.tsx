import { useTheme } from "styled-components";
import React from "react";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Link } from "@components/Link/Link";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Divider } from "@components/Divider/styled/Divider.styled";

export const ClinicSettingsMembership = () => {
  const theme = useTheme();

  return (
    <GroupItems gap={20}>
      <FlexGroup column gap={0}>
        <Paragraph>
          See full plan info here:{" "}
          <Link
            color={theme.colors.malibuLight}
            href={"https://www.website.com/price"}
          >
            https://www.website.com/price
          </Link>
        </Paragraph>

        <Divider $color={"#d7d7d7"} />

        <Paragraph>
          To cancel your subscription please email:{" "}
          <Link
            color={theme.colors.malibuLight}
            href={"mailto:info@website.com"}
          >
            info@website.com
          </Link>
        </Paragraph>
      </FlexGroup>
    </GroupItems>
  );
};
