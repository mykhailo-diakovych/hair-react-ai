import React from "react";

export interface IAccordionItem {
  id: string;
  title: string;
  iconName?: string;
  children: React.ReactNode;
}
