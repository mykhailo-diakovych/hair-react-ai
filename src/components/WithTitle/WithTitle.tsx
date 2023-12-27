import { useTitle } from "react-use";
import React from "react";
import { ROUTES_TITLES } from "@config/constants";

export const WithTitle = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  useTitle(`${title ? title + " | " : ""}${ROUTES_TITLES.DEFAULT_TITLE}`);

  return <>{children}</>;
};
