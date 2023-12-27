import React, { forwardRef } from "react";
import { useDynamicSvgImport } from "@hooks/useDynamicSvgImport";
import { LoadingOutlined } from "@ant-design/icons";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string;
  className?: string;
  $color?: string;
}

export const IconBase = forwardRef(
  ({ iconName, className, style, ...props }: IconProps, ref) => {
    const { loading, SvgIcon } = useDynamicSvgImport(iconName);

    return (
      <>
        {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}

        {SvgIcon && <SvgIcon style={style} {...props} className={className} />}
      </>
    );
  }
);
