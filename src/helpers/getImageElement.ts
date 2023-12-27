import { getImgObjSource } from "@helpers/getImageDataContext";

export const toDataURL = (
  url: string,
  imageDataObject?: ImageData
): Promise<string> =>
  new Promise(async (resolve, _reject) => {
    const imageData = imageDataObject
      ? imageDataObject
      : ((await getImgObjSource(url)) as ImageData);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = imageData.width;
    canvas.height = imageData.height;

    ctx?.putImageData(imageData, 0, 0);

    resolve(canvas.toDataURL());
  });

export const getImageElement = async (
  src: string,
  imageData?: ImageData,
  isBase64 = false
): Promise<HTMLImageElement> =>
  new Promise(async (resolve) => {
    try {
      const image = new Image();

      const imageBase64 = isBase64 ? src : await toDataURL(src, imageData);

      image.src = imageBase64;

      image.addEventListener("load", (e) => {
        resolve(e.target as HTMLImageElement);
      });
    } catch (e) {
      resolve(new Image());
    }
  });
