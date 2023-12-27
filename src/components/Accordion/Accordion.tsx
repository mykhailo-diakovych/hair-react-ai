import React, { useMemo } from "react";
import { Collapse, CollapseProps } from "antd";
import { IconSprite } from "@components/Icon/IconSprite";
import { IAccordionItem } from "@components/Accordion/interfaces/AccordionItem";

const { Panel } = Collapse;

interface AccordionProps extends CollapseProps {
  iconName?: string;
  iconStyle?: React.CSSProperties;
  isOpen?: boolean;
  accordionItems: IAccordionItem[];
  $disabled?: boolean;
}

export const AccordionBase = ({
  accordionItems,
  isOpen,
  iconStyle = {},
  activeKey,
  defaultActiveKey,
  ...props
}: AccordionProps) => {
  const activeKeyId = useMemo(() => {
    return isOpen
      ? activeKey || defaultActiveKey || accordionItems[0].id
      : undefined;
  }, [isOpen]);

  return (
    <Collapse
      bordered={false}
      activeKey={activeKeyId}
      expandIcon={() => (
        <IconSprite
          iconName={"button/chevron-down"}
          style={{ width: 16, height: 16 }}
        />
      )}
      {...props}
    >
      {accordionItems.map((item) => (
        <Panel
          style={{
            marginBottom: 15
          }}
          key={item.id}
          header={item.title}
          extra={
            item.iconName ? (
              <IconSprite iconName={item.iconName} style={{ ...iconStyle }} />
            ) : (
              false
            )
          }
        >
          {item.children}
        </Panel>
      ))}
    </Collapse>
  );
};
