import { DeepAr } from "src/interfaces/deepAr.interface";
import React, { createContext, SetStateAction } from "react";
import { CreatePatientResponse } from "@services/Patients/interfaces/createPatientResponse.interface";
import { UploadImageResponse } from "@services/Files/interfaces/UploadImageResponse.interface";
import {
  DEFAULT_UPLOAD_PHOTO,
  UploadPhoto
} from "@features/clinic/patients/profile/components/UploadPhotoCard/UploadPhotoCard";

interface IClientTabsContext {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  deepAr: React.MutableRefObject<DeepAr | null>;
  isDeepArLoading: boolean;
  croppedData: ImageData | undefined;
  setCroppedImageData: React.Dispatch<SetStateAction<ImageData | undefined>>;
  image: UploadPhoto;
  setImage: React.Dispatch<React.SetStateAction<UploadPhoto>>;
  croppedImage: UploadPhoto;
  setCroppedImage: React.Dispatch<React.SetStateAction<UploadPhoto>>;
  isSimulationReady: boolean;
  setIsSimulationReady: React.Dispatch<React.SetStateAction<boolean>>;
  parentImage: UploadImageResponse | null;
  setParentImage: React.Dispatch<
    React.SetStateAction<UploadImageResponse | null>
  >;
  originalImage: UploadImageResponse | null;
  setOriginalImage: React.Dispatch<
    React.SetStateAction<UploadImageResponse | null>
  >;
  imageWithEffect: UploadImageResponse | null;
  setImageWithEffect: React.Dispatch<
    React.SetStateAction<UploadImageResponse | null>
  >;
  leadPatient: CreatePatientResponse | undefined;
  setLeadPatient: React.Dispatch<
    React.SetStateAction<CreatePatientResponse | undefined>
  >;
  isOpenContactInfoModal: boolean;
  setIsOpenContactInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DEFAULT_CLIENT_TABS_CONTEXT: IClientTabsContext = {
  canvasRef: React.createRef(),
  deepAr: React.createRef(),
  isDeepArLoading: false,
  croppedData: undefined,
  setCroppedImageData: () => {},
  image: DEFAULT_UPLOAD_PHOTO,
  setImage: () => {},
  croppedImage: DEFAULT_UPLOAD_PHOTO,
  setCroppedImage: () => {},
  isSimulationReady: false,
  setIsSimulationReady: () => {},
  parentImage: null,
  setParentImage: () => {},
  originalImage: null,
  setOriginalImage: () => {},
  imageWithEffect: null,
  setImageWithEffect: () => {},
  leadPatient: undefined,
  setLeadPatient: () => {},
  isOpenContactInfoModal: false,
  setIsOpenContactInfoModal: () => {}
};

export const ClientTabsContext = createContext<IClientTabsContext>(
  DEFAULT_CLIENT_TABS_CONTEXT
);
