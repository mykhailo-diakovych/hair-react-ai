import { createPortal } from "react-dom";
import React from "react";

export const Portal = ({
  children,
  selector = "body",
  elementToAppend
}: {
  children: React.ReactNode;
  selector?: string;
  elementToAppend?: Element;
}) => {
  const element = elementToAppend || document.querySelector(selector);

  if (!element) {
    return null;
  }

  return createPortal(children, element);
};
