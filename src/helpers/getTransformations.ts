export const getTransformations = (transformStyle: string) => {
  // Regular expressions to extract values
  const translateRegex = /translate\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px\)/;
  const rotateRegex = /rotate\((-?\d+\.?\d*)deg\)/;
  const scaleRegex = /scale\((-?\d+\.?\d*),\s*(-?\d+\.?\d*)\)/;

  // Extract translate values
  const translateMatch = transformStyle.match(
    translateRegex
  ) as RegExpMatchArray;
  const translateX = parseFloat(translateMatch?.at(1) || "0");
  const translateY = parseFloat(translateMatch?.at(2) || "0");

  // Extract rotate value
  const rotateMatch = transformStyle.match(rotateRegex) as RegExpMatchArray;
  const rotation = parseFloat(rotateMatch?.at(1) || "0");

  // Extract scale values
  const scaleMatch = transformStyle.match(scaleRegex) as RegExpMatchArray;
  const scaleX = parseFloat(scaleMatch?.at(1) || "0");
  const scaleY = parseFloat(scaleMatch?.at(2) || "0");

  // console.log("TranslateX:", translateX);
  // console.log("TranslateY:", translateY);
  // console.log("Rotation:", rotation);
  // console.log("ScaleX:", scaleX);
  // console.log("ScaleY:", scaleY);

  return {
    translateX: translateX,
    translateY: translateY,
    rotate: rotation,
    scaleX: scaleX,
    scaleY: scaleY
  };
};

export const getRotatedCoordinates = (
  x: number,
  y: number,
  rotateAngle: number
) => {
  if (rotateAngle === 0) {
    return {
      x,
      y
    };
  }

  const newX = x * Math.cos(rotateAngle) - y * Math.sin(rotateAngle);
  const newY = x * Math.sin(rotateAngle) + y * Math.cos(rotateAngle);

  return {
    x: newX,
    y: newY
  };
};
