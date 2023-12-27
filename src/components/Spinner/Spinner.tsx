import React from "react";
import { SpinnerIcon } from "@components/Spinner/components/SpinnerIcon/SpinnerIcon";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  style?: React.CSSProperties;
  tip?: string;
}

export const SpinnerBase = ({
  tip,
  className,
  style = {},
  ...props
}: SpinnerProps) => {
  return (
    <FlexGroup className={className} center centerY {...props}>
      {tip && (
        <Paragraph
          style={{ zIndex: 123, transform: "translate(-50%, 0)" }}
          size={"lg"}
        >
          {tip}
        </Paragraph>
      )}

      <SpinnerIcon style={style} />
    </FlexGroup>
  );
};
