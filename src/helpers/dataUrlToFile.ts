import { getImageData } from "@helpers/getImageDataContext";

export async function dataUrlToFile(
  dataUrl: string,
  fileName: string
): Promise<File> {
  const imageData = await getImageData(dataUrl);

  const byteArray = new Uint8Array(imageData.data.buffer);

  return new File([byteArray], fileName, { type: "image/jpeg" });
}
