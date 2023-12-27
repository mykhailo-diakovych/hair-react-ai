import { useContext, useMemo } from "react";
import { useAuthentication } from "@hooks/useAuthentication";
import { ROUTES, ACCESS_TOKEN, VIEWMODS } from "@config/constants";

import { GlobalStorage } from "../AppContext";

export const useNavigation = () => {
  const { user } = useAuthentication();

  const token = localStorage.getItem(ACCESS_TOKEN);

  const { viewMode } = useContext(GlobalStorage);

  const navigationItems = useMemo(() => {
    const SUPERADMIN_NAVIGATION_ITEMS = [
      {
        id: "1",
        iconName: "navigation/home",
        name: "Simulations",
        path: ROUTES.CLINICS_HOME
      },
      {
        id: "2",
        iconName: "navigation/menu-patients",
        name: "Profiles",
        path: ROUTES.CLINICS_PATIENTS
      },
      {
        id: "3",
        name: "Clinics",
        iconName: "navigation/clinics",
        path: ROUTES.CLINICS
      }
    ];

    const EXTENDED_NAVIGATION_ITEMS = [
      {
        id: "1",
        iconName: "navigation/home",
        name: "Simulations",
        path: ROUTES.CLINIC_HOME
      },
      {
        id: "2",
        iconName: "navigation/menu-patients",
        name: "Profiles",
        path: ROUTES.CLINIC_PATIENTS
      }
      // {
      //   id: "3",
      //   name: "Tutorials & FAQs",
      //   iconName: "navigation/tutorial",
      //   path: ROUTES.TUTORIALS
      // }
    ];

    const DEFAULT_NAVIGATION_ITEMS = [
      {
        id: "1",
        name: "Website",
        iconName: "navigation/home",
        href: "https://restoration-hair.webflow.io/"
      },
      {
        id: "2",
        name: "Login",
        iconName: "navigation/lock",
        path: ROUTES.LOGIN
      }
    ];

    const navigationItems =
      viewMode === VIEWMODS.SUPERADMIN
        ? SUPERADMIN_NAVIGATION_ITEMS
        : EXTENDED_NAVIGATION_ITEMS;

    return token ? navigationItems : DEFAULT_NAVIGATION_ITEMS;
  }, [token, user, viewMode]);

  return {
    navigationItems
  };
};
