export type DrawImgOptions = [
  CanvasImageSource,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export function correctImgOptions(
  options: DrawImgOptions,
  targetRatio: number,
  imgWidth: number,
  imgHeight: number,
  withoutCropping = false
): DrawImgOptions {
  const srcRatio = imgWidth / imgHeight;
  if (targetRatio > srcRatio) {
    if (withoutCropping) {
      const appWidth = options[7];
      options[3] = imgWidth; // src width
      options[4] = imgHeight; // src height
      options[7] = options[8] * srcRatio;
      options[5] = (appWidth - options[7]) / 2; // X targ offset
    } else {
      const dHeight = imgWidth / targetRatio;
      options[2] = (imgHeight - dHeight) / 2; // Y offset
      options[3] = imgWidth; // src width
      options[4] = dHeight; // src height
    }
  } else {
    if (withoutCropping) {
      const appHeight = options[8];
      options[3] = imgWidth; // src width
      options[4] = imgHeight; // src height
      options[8] = options[7] / srcRatio;
      options[6] = (appHeight - options[8]) / 2; // Y targ offset
    } else {
      const dWidth = withoutCropping ? imgWidth : imgHeight * targetRatio;
      options[1] = (imgWidth - dWidth) / 2; // X offset
      options[3] = dWidth; // src width
      options[4] = imgHeight; // src height
    }
  }
  return options;
}

export function getCtxImageData(
  loadedImg: HTMLImageElement,
  appW: number,
  appH: number
) {
  const canvas = document.createElement("canvas");
  canvas.width = appW;
  canvas.height = appH;
  const ctx = canvas.getContext("2d");
  const targetRatio = appW / appH;

  const options: DrawImgOptions = [
    loadedImg,
    0,
    0,
    appW,
    appH,
    0,
    0,
    appW,
    appH
  ];

  ctx?.drawImage(
    ...correctImgOptions(
      options,
      targetRatio,
      loadedImg.width,
      loadedImg.height,
      true
    )
  );

  return ctx?.getImageData(0, 0, appW, appH);
}

export const getImgObjSource = async (
  url: string,
  crossOrigin = ""
): Promise<ImageData> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.setAttribute("crossOrigin", crossOrigin);
    img.src = url + "?" + new Date().getTime();

    img.onload = () => {
      resolve(
        getCtxImageData(img, img.naturalWidth, img.naturalHeight) as ImageData
      );
    };
  });
};

export const setImgObjSource = async (
  src: string,
  crossOrigin = ""
): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.setAttribute("crossOrigin", crossOrigin);
    img.src = src + "?" + new Date().getTime();

    img.onload = () => {
      resolve(img);
    };
  });
};

export const getImgUrlFromData = (data: ImageData) => {
  if (data) {
    const canvas = document.createElement("canvas");
    canvas.width = data.width;
    canvas.height = data.height;
    const ctx = canvas.getContext("2d");
    ctx?.putImageData(data, 0, 0);
    return canvas.toDataURL();
  }

  return "";
};

export const getImageData = (src: string): Promise<ImageData> => {
  return new Promise((resolve) => {
    const image = new Image();

    image.src = src;

    image.onload = () => {
      // Create a canvas element
      const canvas = document.createElement("canvas");

      // Set the canvas dimensions to match the image
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image onto the canvas
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.drawImage(image, 0, 0);

      // Retrieve the image data from the canvas
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      resolve(imageData);
    };
  });
};
