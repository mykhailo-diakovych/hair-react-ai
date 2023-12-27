import { MutableRefObject, RefObject } from "react";
import React from "react";

import * as deepar from "deepar";

import { normalizeSliderValue } from "@helpers/deepar/normalizeValue";
import { getMaterialPath } from "@helpers/deepar/getMaterialPath";
import { convertHexToRGB } from "@helpers/deepar/convertHexToRGB";

import {
  LIGHTING_AXIS_SLIDER,
  LIGHTING_BRIGHTNESS_SLIDER,
  ROTATE_SLIDER,
  SCALE_SLIDER,
  SimulationHairOption
} from "@config/constants";

import { DeepAr } from "../interfaces/deepAr.interface";

export const initDeepAr = async (
  ref: RefObject<HTMLCanvasElement>,
  withEffect = false
) => {
  try {
    const effectURL = new URL(
      `../assets/effects/ml/wt/hl_2/sr/st/model_1.deepar`,
      import.meta.url
    ).href;

    const deepAr = await deepar.initialize({
      licenseKey: import.meta.env.VITE_DEEPAR_LICENSE_KEY,
      canvas: document.getElementById("deepar-canvas") as HTMLCanvasElement,
      ...(withEffect ? { effect: effectURL } : {}),
      additionalOptions: {
        cameraConfig: {
          disableDefaultCamera: true
        }
      }
    });

    deepAr.callbacks.onFaceTracked = (data) => {
      if (data.length == 0) {
        return false;
      }

      const faceDetected = data.some((face) => face.detected);
      if (window.DeepAR) {
        window.DeepAR.faceDetected = faceDetected;
      }

      return faceDetected;
    };

    return deepAr;
  } catch (e) {
    // initDeepAr(ref, withEffect);
  }

  return null;
};

export const processImage = async (
  deepAr: MutableRefObject<DeepAr | null>,
  imageData: ImageData | null,
  times = 5,
  imageElement: HTMLImageElement | null = null
) => {
  return new Promise(async (resolve) => {
    try {
      if (imageData && imageData.width && imageData.height) {
        const imageByteArray = new Uint8Array(imageData?.data.buffer);

        for (let i = 0; i < times; i++) {
          if (imageElement) {
            deepAr.current?.processImage(imageElement);
          } else {
            deepAr.current?.processFrame(
              imageByteArray,
              imageData?.width as number,
              imageData?.height as number,
              false
            );
          }
        }

        resolve(true);
      }
    } catch (e: any) {
      resolve(false);
    }
  });
};

export const switchEffect = async (
  deepAr: MutableRefObject<DeepAr | null>,
  effectName: string,
  slotInd?: number
) => {
  try {
    const { default: effectModule } = await import(
      `../assets/effects/${effectName}.deepar`
    );

    console.log("switched effect to: ", effectName, " for slot", slotInd);

    if (slotInd) {
      return await deepAr.current?.switchEffect(effectModule, {
        slot: `slot_${slotInd}`
      });
    } else {
      return await deepAr.current?.switchEffect(effectModule, {
        slot: "slot_1"
      });
    }
  } catch (err: any) {
    console.log(err?.message);
  }
};

export function changeColorParameter(
  deepAr: MutableRefObject<DeepAr | null>,
  imageData: ImageData | null,
  color: string,
  brightness = LIGHTING_BRIGHTNESS_SLIDER.default
) {
  const [r, g, b] = convertHexToRGB(color);
  const convertedBrightness = normalizeSliderValue(
    brightness,
    LIGHTING_BRIGHTNESS_SLIDER
  );

  ["u_diffuseColor", "u_ambientColor", "u_colorDir"].map((paramName) => {
    [1, 2, 3].map((slotInd) => {
      deepAr.current?.changeParameterVector(
        `Sphere_r${slotInd}`,
        "MeshRenderer",
        paramName,
        r,
        g,
        b,
        convertedBrightness
      );
      // processImage(deepAr, imageData, 1);
    });
  });
}

export const changeEffectColor = (
  deepAr: MutableRefObject<DeepAr | null>,
  imageData: ImageData | null,
  color: string,
  brightness = 1
) => {
  if (deepAr && deepAr.current) {
    changeColorParameter(deepAr, imageData, color, brightness);
  }
};

export const changeHairline = (
  deepAr: MutableRefObject<DeepAr | null>,
  imageData: ImageData | null,
  hairline: number
) => {
  const hlValue = hairline * -1;

  [1, 2, 3].map((slotInd) => {
    deepAr.current?.changeParameterVector(
      `Sphere_r1${slotInd === 1 ? "" : slotInd}`,
      "MeshRenderer",
      "Hairline",
      hlValue,
      0,
      0,
      0
    );
    // processImage(deepAr, imageData, 1);
  });
};

export const changePosition = (
  deepAr: MutableRefObject<DeepAr | null>,
  x = 0,
  y = 0,
  z = 0
) => {
  [1, 2, 3].map((slotInd) => {
    deepAr.current?.changeParameterVector(
      `Quad_r${slotInd}`,
      "",
      "position",
      x,
      y,
      z,
      0
    );
  });
};

export const changeRotate = (
  deepAr: MutableRefObject<DeepAr | null>,
  x = ROTATE_SLIDER.default,
  y = ROTATE_SLIDER.default,
  z = ROTATE_SLIDER.default
) => {
  [1, 2, 3].map((slotInd) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    deepAr.current?.changeParameterVector(
      `Quad_r${slotInd}`,
      "",
      "rotation",
      y,
      x,
      z,
      0
    );
  });
};

export const changeScale = (
  deepAr: MutableRefObject<DeepAr | null>,
  x = SCALE_SLIDER.default,
  y = SCALE_SLIDER.default,
  z = SCALE_SLIDER.default
) => {
  [1, 2, 3].map((slotInd) => {
    deepAr.current?.changeParameterVector(
      `Sphere_r${slotInd === 1 ? "" : slotInd}`,
      "",
      "scale",
      y,
      x || 1,
      z || 1,
      0
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    deepAr.current?.changeParameterVector(
      `Sphere_r1${slotInd === 1 ? "" : slotInd}`,
      "",
      "scale",
      y,
      x || 1,
      z || 1,
      0
    );
  });

  [2, 3].map((slotInd) => {
    ["B", "C"].map((slotIndLast) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      deepAr.current?.changeParameterVector(
        `R${slotInd}${slotIndLast}`,
        "",
        "scale",
        y,
        x || 1,
        z || 1,
        0
      );
    });
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  deepAr.current?.changeParameterVector("Occluder", "", "scale", x, y, z, 1);
};

export const changeLighting = (
  deepAr: MutableRefObject<DeepAr | null>,
  imageData: ImageData | null,
  x = LIGHTING_AXIS_SLIDER.default,
  y = LIGHTING_AXIS_SLIDER.default,
  z = LIGHTING_AXIS_SLIDER.default
) => {
  [1, 2, 3].map((slotInd) => {
    deepAr.current?.changeParameterVector(
      `Sphere_r${slotInd}`,
      "MeshRenderer",
      "u_lightPosDir",
      x,
      y,
      z,
      0
    );
    // processImage(deepAr, imageData, 1);
  });
};

export const changeMaterial = (
  deepAr: MutableRefObject<DeepAr | null>,
  imageData: ImageData | null,
  path: string,
  slotInd: number
) => {
  deepAr.current?.changeParameterTexture(
    `Sphere_r${slotInd}`,
    "MeshRenderer",
    "s_texDiffuse",
    path
  );
  // processImage(deepAr, imageData, 2);

  console.log(`changed material to: ${path} for slot ${slotInd}`);
};

export const clearEffect = async (deepAr: MutableRefObject<DeepAr | null>) => {
  console.log("clearEffect");

  await deepAr.current?.clearEffect();
};

export const shutdown = async (deepAr: MutableRefObject<DeepAr | null>) => {
  console.log("DeepAR shutdown...");

  await deepAr.current?.stopCamera();
  await deepAr.current?.shutdown();

  window.DeepAR = null;
};

export const takeScreenshot = async (
  deepAr: MutableRefObject<DeepAr | null>
) => {
  try {
    const image = await deepAr.current?.takeScreenshot();
    const img = new Image();
    img.src = image as string;
    deepAr.current?.stopCamera();

    if (image) {
      // console.log(image);
    }

    return React.createElement("img", { src: image });
  } catch (err: unknown) {
    console.log(err);
  }
};

export const isFaceDetected = async (
  deepAr: MutableRefObject<DeepAr | null>
): Promise<boolean> => {
  return new Promise((resolve) => {
    if (deepAr.current) {
      deepAr.current.callbacks.onFaceTracked = (data) => {
        if (data.length == 0) {
          return resolve(false);
        }

        const faceDetected = data.some((face) => face.detected);
        if (window.DeepAR) {
          window.DeepAR.faceDetected = faceDetected;
        }

        return resolve(faceDetected);
      };

      setTimeout(() => {
        resolve(false);
      }, 5000);
    } else {
      return resolve(false);
    }
  });
};

export const changeSectionVolumeForSlot = async (
  deepAr: MutableRefObject<DeepAr | null>,
  imageData: ImageData | null,
  { hairStyle, hairType, slotInd, volume } = <
    {
      hairStyle?: SimulationHairOption;
      hairType?: SimulationHairOption;
      slotInd: number;
      volume: number;
    }
  >{}
) => {
  changeMaterial(
    deepAr,
    imageData,
    getMaterialPath({
      style: hairStyle,
      type: hairType,
      material: `${volume}.png`
    }),
    slotInd
  );
  // processImage(deepAr, imageData, 1);

  // setTimeout(() => {
  //   processImage(deepAr, imageData, 1);
  // }, 500);
};

export const changeEffectVisibility = (
  deepAr: MutableRefObject<DeepAr | null>,
  visible: boolean
) => {
  [1, 2, 3].map((slotInd) => {
    deepAr.current?.changeParameterBool(
      `Mesh_r${slotInd}`,
      "",
      "enabled",
      visible
    );
  });
};
