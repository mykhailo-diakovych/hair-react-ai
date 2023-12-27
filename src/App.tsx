import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import { ClinicsPatients } from "@features/superadmin/patients/ClinicsPatients";
import { ClinicsHome } from "@features/superadmin/home/ClinicsHome";
import { Clinics } from "@features/superadmin/clinics/home/Clinics";
import { Simulator } from "@features/simulator/Simulator";
import { SimulationPreviewAll } from "@features/simulation/previewAll/SimulationPreviewAll";
import { SimulationPreview } from "@features/simulation/preview/SimulationPreview";
import { Simulation } from "@features/simulation/home/Simulation";
import { Settings } from "@features/clinic/settings/Settings";
import { ClinicPatientProfile } from "@features/clinic/patients/profile/ClinicPatientProfile";
import { ClinicPatients } from "@features/clinic/patients/home/ClinicPatients";
import { Home } from "@features/clinic/home/Home";
import { Client } from "@features/client/home/Client";
import { AuthenticationCredentials } from "@features/authentication/interfaces/AuthenticationCredentials.interface";
import { Registration } from "@features/authentication/components/Registration/Registration";
import { Login } from "@features/authentication/components/Login/Login";
import { ResetPasswordEmail } from "@features/account/ResetPassword/ResetPasswordEmail";
import { ResetPassword } from "@features/account/ResetPassword/ResetPassword";
import {
  ROUTES,
  ROUTES_TITLES,
  VIEWMODE_STORAGE_KEY,
  VIEWMODS
} from "@config/constants";
import { WithTitle } from "@components/WithTitle/WithTitle";
import { ProtectedRoute } from "@components/ProtectedRoute/ProtectedRoute";

import { GlobalStorage } from "./AppContext";

import "./config/crisp";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [viewMode, setViewMode] = useState(
    localStorage.getItem(VIEWMODE_STORAGE_KEY) as VIEWMODS
  );

  const [user, setUser] = useState<AuthenticationCredentials | null>(null);

  return (
    <GlobalStorage.Provider value={{ viewMode, setViewMode, user, setUser }}>
      <Routes>
        {/*  AUTHENTICATION ROUTES */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <WithTitle title={ROUTES_TITLES.LOGIN}>
              <Login />
            </WithTitle>
          }
        />
        <Route
          path={ROUTES.SIGNUP}
          element={
            <WithTitle title={ROUTES_TITLES.SIGNUP}>
              <Registration />
            </WithTitle>
          }
        />
        <Route
          path={ROUTES.RESET_PASSWORD_EMAIL}
          element={
            <WithTitle title={ROUTES_TITLES.RESET_PASSWORD_EMAIL}>
              <ResetPasswordEmail />
            </WithTitle>
          }
        />
        <Route
          path={ROUTES.RESET_PASSWORD}
          element={
            <WithTitle title={ROUTES_TITLES.RESET_PASSWORD}>
              <ResetPassword />
            </WithTitle>
          }
        />

        {/* CLINIC ROUTES */}
        <Route
          path={ROUTES.CLINIC_HOME}
          element={
            <WithTitle title={ROUTES_TITLES.CLINIC_HOME}>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </WithTitle>
          }
        />
        <Route
          path={ROUTES.CLINIC_PATIENTS}
          element={
            <WithTitle title={ROUTES_TITLES.CLINIC_PATIENTS}>
              <ProtectedRoute>
                <ClinicPatients />
              </ProtectedRoute>
            </WithTitle>
          }
        />
        {/* <Route
          path={ROUTES.TUTORIALS}
          element={
            <WithTitle title={ROUTES_TITLES.CLIENT}>
              <Tutorials />
            </WithTitle>
          }
        /> */}
        <Route
          path={ROUTES.SETTINGS}
          element={
            <WithTitle title={ROUTES_TITLES.SETTINGS}>
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            </WithTitle>
          }
        />

        <Route
          path={ROUTES.CLINIC_PATIENT_PROFILE}
          element={
            <WithTitle title={ROUTES_TITLES.CLINIC_PATIENT_PROFILE}>
              <ProtectedRoute>
                <ClinicPatientProfile />
              </ProtectedRoute>
            </WithTitle>
          }
        />

        {/* SIMULATION ROUTES*/}
        <Route
          path={ROUTES.SIMULATION_PREVIEW}
          element={
            <WithTitle title={ROUTES_TITLES.SIMULATION_PREVIEW}>
              <SimulationPreview />
            </WithTitle>
          }
        />
        <Route
          path={ROUTES.SIMULATION_PREVIEW_ALL}
          element={
            <WithTitle title={ROUTES_TITLES.SIMULATION_PREVIEW_ALL}>
              <SimulationPreviewAll />
            </WithTitle>
          }
        />
        <Route
          path={ROUTES.EDIT_SIMULATION}
          element={
            <WithTitle title={ROUTES_TITLES.EDIT_SIMULATION}>
              <ProtectedRoute>
                <Simulation />
              </ProtectedRoute>
            </WithTitle>
          }
        />
        <Route
          path={ROUTES.SIMULATOR}
          element={
            <WithTitle title={ROUTES_TITLES.SIMULATOR}>
              <ProtectedRoute>
                <Simulator />
              </ProtectedRoute>
            </WithTitle>
          }
        />

        {/* SUPER ADMIN ROUTES */}
        <Route
          path={ROUTES.CLINICS}
          element={
            <WithTitle title={ROUTES_TITLES.CLINICS}>
              <ProtectedRoute>
                <Clinics />
              </ProtectedRoute>
            </WithTitle>
          }
        />
        <Route
          path={ROUTES.CLINICS_HOME}
          element={
            <WithTitle title={ROUTES_TITLES.CLINICS_HOME}>
              <ProtectedRoute>
                <ClinicsHome />
              </ProtectedRoute>
            </WithTitle>
          }
        />
        <Route
          path={ROUTES.CLINICS_PATIENTS}
          element={
            <WithTitle title={ROUTES_TITLES.CLINICS_PATIENTS}>
              <ProtectedRoute>
                <ClinicsPatients />
              </ProtectedRoute>
            </WithTitle>
          }
        />

        {/* CLIENT ROUTES  */}
        <Route
          path={ROUTES.CLIENT}
          element={
            <WithTitle title={ROUTES_TITLES.CLIENT}>
              <Client />
            </WithTitle>
          }
        />
      </Routes>
    </GlobalStorage.Provider>
  );
}

export default App;
