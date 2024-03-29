export const ANGULAR_MEASUREMENT_LABELS = [
  "Degrees",
  "Minutes of Arc",
  "Seconds of Arc",
];
export const PLOTDIVISOR = 6;

// for loading images from img folder in Selector and Canvas
export const getImgPath = (folderName, filename, extension) => {
  const pathToFolder = "./img/";
  const pathToImg = folderName + "/" + filename + extension;
  return pathToFolder + pathToImg;
};

export const getXorBodyImg = (currCrowdName, currBodyName, newBodyName) => {
  if (!currBodyName) return getImgPath(currCrowdName, newBodyName, ".png");
  if (currBodyName === newBodyName)
    return getImgPath("body-selection", "selectedx", ".png");
  return getImgPath(currCrowdName, newBodyName, ".png");
};

// selector and canvas
export function isEmptyObject(value) {
  return Object.keys(value).length === 0 && value.constructor === Object;
}

// drawSquareCanvas & drawCircleCanvas
export function nrstPointZero(val, width) {
  // round to nearest 0.5
  // http://diveintohtml5.info/canvas.html
  let pointZero = Math.round(val - 0.5) + 0.5;
  // if its near the width, floor it and round 0.5 down.
  if (pointZero >= Math.floor(width)) {
    pointZero = Math.floor(width) - 0.5;
  }
  return pointZero;
}

export function isArcSeconds(canvasAU) {
  return (
    typeof canvasAU === "string" && canvasAU === ANGULAR_MEASUREMENT_LABELS[2]
  );
}

// in the formInfo etc.. //
// returns only strings
export function getFratio(flength, barlow, aperture) {
  let b = Number(barlow) <= 0 ? 1 : Number(barlow);
  let f = Number(flength) <= 0 ? 0 : Number(flength) * b;
  let a = Number(aperture) <= 0 ? 0 : Number(aperture);
  let result = Math.floor((f / a) * 10) / 10;
  return a !== 0 && f !== 0 ? "" + result : "";
}

export function getAspectRatio(resX, resY) {
  // calculate the aspect ratio (f.instance "4:3") of our camera lens.
  let aspectRatio = "";
  let x = Number(resX) <= 0 ? 0 : Number(resX);
  let y = Number(resY) <= 0 ? 0 : Number(resY);

  let aspectX = 10000;
  let aspectY = x === 0 || y === 0 ? 0 : (y / x) * 10000;

  if (aspectY !== 0) {
    let factorX = [];
    let factorY = [];
    for (let i = 1; i <= aspectX; i++) {
      if (aspectX % i === 0) factorX.push(i);
      if (aspectY % i === 0) factorY.push(i);
    }
    if (factorY.length && factorX.length) {
      const commonFactors = factorX.filter((n) => factorY.indexOf(n) !== -1);
      const greatestCommonFactor = Math.max(...commonFactors);
      aspectX /= greatestCommonFactor;
      aspectY /= greatestCommonFactor;
      aspectRatio = aspectX + ":" + aspectY;
    }
  }
  return aspectRatio;
}

export function getMag(flengthScope, flengthEye) {
  const scope = Number(flengthScope) <= 0 ? 0 : Number(flengthScope);
  const eye = Number(flengthEye) <= 0 ? 0 : Number(flengthEye);
  const result = Math.round((scope / eye) * 10) / 10;
  return eye !== 0 && scope !== 0 ? "" + result : "";
}

export function getMaxMag(flengthNoBarlow, aperture) {
  const f = Number(flengthNoBarlow) <= 0 ? 0 : Number(flengthNoBarlow);
  let a = Number(aperture) <= 0 ? 0 : Number(aperture);
  let result = Math.round(a * 2 * 10) / 10;
  return f !== 0 && a !== 0 ? "" + result : "";
}

export function getPxPerGridSquare(
  resX,
  resY,
  plotX,
  plotY,
  hasGrid,
  hasRedGrid,
  redGridFactor
) {
  // calculate the amount of pixels² per canvas grid square.
  let pxPerSquare = "";
  const rX = Number(resX) <= 0 ? 0 : Number(resX);
  const rY = Number(resY) <= 0 ? 0 : Number(resY);
  const pX = Number(plotX) <= 0 ? 1 : Number(plotX);
  const pY = Number(plotY) <= 0 ? 1 : Number(plotY);

  // if the grid switch is ON and none of the numbers above are 0, we calcuate the grid pixel size.
  if (hasGrid && [rX, rY, pX, pY].indexOf(0) === -1) {
    let pxPerUnitX = Math.round((rX / pX) * 10) / 10;
    let pxPerUnitY = Math.round((rY / pY) * 10) / 10;

    pxPerSquare = Math.round(pxPerUnitX * pxPerUnitY * 10) / 10;

    // if hasRedGrid, then the px² should be the: result * redGridFactor²?
    pxPerSquare = hasRedGrid
      ? Math.round(pxPerSquare * (redGridFactor * redGridFactor) * 10) / 10 +
        "px²"
      : Math.round(pxPerSquare * 10) / 10 + "px²";
  }
  return pxPerSquare;
}

export function getChipSize(resX, resY, micronssquared) {
  // get camera sensor size in mm²
  let chipSize = "";
  const rX = Number(resX) <= 0 ? 0 : Number(resX);
  const rY = Number(resY) <= 0 ? 0 : Number(resY);
  const pxSize = Number(micronssquared) <= 0 ? 0 : Number(micronssquared);
  // any none of the the var above are 0.
  if ([rX, rY, pxSize].indexOf(0) === -1) {
    const sensorXsizeMM = mic2mm(rX, pxSize);
    const sensorYsizeMM = mic2mm(rY, pxSize);
    chipSize = Math.round(sensorXsizeMM * sensorYsizeMM * 10) / 10 + "mm²";
  }
  return chipSize;
}

// Returns a unit TFOV in degrees based on the apparent-FOV of an eyepiece
// and the magnification of the telescope+eyepiece setup. afov / magnification.
export function getTFOVdeg(afov, mag) {
  const a = Number(afov) <= 0 ? 1 : Number(afov);
  const m = Number(mag) <= 0 ? 1 : Number(mag);
  return a / m;
}

export function getFlength(flength, barlow) {
  const b = Number(barlow) <= 0 ? 1 : Number(barlow);
  const f = Number(flength) <= 0 ? 0 : Number(flength) * b;
  return f;
}

// convert microns into mm
// Calculate the mm size of one side of the camera sensor (X or Y)
// based on resolution (f.instace 640) and chipsize (microns squared)
export function mic2mm(resolution, micronssquared) {
  let sensorMM = Number(Math.sqrt(micronssquared) / 1000) * Number(resolution);
  sensorMM = Math.round(sensorMM * 10) / 10;

  return sensorMM;
}

// return the FOV in radians based on the sensor size (in milimeters) divided by the telescop focal length (inc barlow).
export function sensor2rad(sensorMM, flength) {
  return sensorMM / flength;
}

// convert from radians to degrees
export function rad2deg(radians) {
  return radians * (180 / Math.PI);
}

// export function rad2arcmin(radians) {
//   // convert from radians to arc minutes
//   const deg = radians * (180 / Math.PI);
//   const arcMin = deg * 60;
//   return arcMin;
// }

// export function rad2arcsec(radians) {
//   // convert from radians to arc seconds
//   const deg = radians * (180 / Math.PI);
//   const arcSec = deg * 3600;
//   return arcSec;
// }

export function deg2arcmin(deg) {
  return deg * 60;
}

export function deg2arcsec(deg) {
  return deg * 3600;
}

// convert from degrees to arc minutes (two sides) and
// check what the best unit is for our canvas.
// Take the "longest" side as our reference.
export function deg2unitCam(degX, degY) {
  const result = degX - degY;
  const preferedRef = result > 0 ? degX : degY;
  const arcminRef = preferedRef * 60;

  if (arcminRef > 60) {
    return ANGULAR_MEASUREMENT_LABELS[0]; // degrees
  } else if (arcminRef < 2) {
    return ANGULAR_MEASUREMENT_LABELS[2]; // arc seconds
  } else {
    return ANGULAR_MEASUREMENT_LABELS[1]; // arc minutes
  }
}

// check what the best angular unit is for our canvas in eyepiece mode
export function deg2unitEye(deg) {
  const arcminRef = deg * 60;
  if (arcminRef > 60) {
    return ANGULAR_MEASUREMENT_LABELS[0]; // degrees
  } else if (arcminRef < 2) {
    return ANGULAR_MEASUREMENT_LABELS[2]; // arc seconds
  } else {
    return ANGULAR_MEASUREMENT_LABELS[1]; // arc minutes
  }
}

// convert angular values from degrees to arcmin or arcsec based on prefered unit.
export function unit2ang(deg, unit) {
  switch (unit) {
    case ANGULAR_MEASUREMENT_LABELS[0]:
      return deg;
    case ANGULAR_MEASUREMENT_LABELS[1]:
      return deg2arcmin(deg);
    case ANGULAR_MEASUREMENT_LABELS[2]:
      return deg2arcsec(deg);
    default:
  }
}

// return only numbers above 0
export function numberify(val) {
  return Number(val) <= 0 ? 0 : Number(val);
}

// returns an object that is used to draw the canvas
// plotSizeX andY are FOV units in degrees, arc min or arc sec * the plotdivisor
export function getCanvasObject(angUnit, degX, degY) {
  switch (angUnit) {
    case ANGULAR_MEASUREMENT_LABELS[0]: // degrees
      return {
        plotSizeX: Math.round(degX * PLOTDIVISOR),
        plotSizeY: Math.round(degY * PLOTDIVISOR),
        angularUnit: ANGULAR_MEASUREMENT_LABELS[0],
      };
    case ANGULAR_MEASUREMENT_LABELS[1]: // arc minutes
      return {
        plotSizeX: Math.round(deg2arcmin(degX) * PLOTDIVISOR),
        plotSizeY: Math.round(deg2arcmin(degY) * PLOTDIVISOR),
        angularUnit: ANGULAR_MEASUREMENT_LABELS[1],
      };
    case ANGULAR_MEASUREMENT_LABELS[2]: // arc seconds
      return {
        plotSizeX: Math.round(deg2arcsec(degX)),
        plotSizeY: Math.round(deg2arcsec(degY)),
        angularUnit: ANGULAR_MEASUREMENT_LABELS[2],
      };
    default:
  }
}

// calculate the tfov (in degrees) and canvas size (x, y) from the user-specified camera sensor
export function cam2canvas(
  pixelsizevalue,
  resolutionxvalue,
  resolutionyvalue,
  focallenghtvalue,
  barlowvalue
) {
  const flength = getFlength(focallenghtvalue, barlowvalue); // telescop focal length

  const sensorXsizeMM = mic2mm(resolutionxvalue, pixelsizevalue); // microns 2 milimeters
  const sensorYsizeMM = mic2mm(resolutionyvalue, pixelsizevalue); // microns 2 milimeters
  const fovXrad = sensor2rad(sensorXsizeMM, flength); //sensor 2 radians (fov)
  const fovYrad = sensor2rad(sensorYsizeMM, flength); //sensor 2 radians (fov)
  const fovXdeg = rad2deg(fovXrad); // radians 2 degrees
  const fovYdeg = rad2deg(fovYrad); // radians 2 degrees
  const preferedUnit = deg2unitCam(fovXdeg, fovYdeg); // degrees 2 unit (arc minutes, seconds or degrees)

  return getCanvasObject(preferedUnit, fovXdeg, fovYdeg);
}

export function eye2canvas(
  eyepieceafovvalue,
  eyepiecefocallengthvalue,
  focallenghtvalue,
  barlowvalue
) {
  // calculate the tfov of or eyepiece from the eyepiece afov, focal length and scope specifics
  const flength_scope = getFlength(focallenghtvalue, barlowvalue); // get telescope focal length
  const mag = getMag(flength_scope, eyepiecefocallengthvalue); // get magnification
  const tFovDeg = getTFOVdeg(eyepieceafovvalue, Number(mag)); // get TFOV in degrees
  const preferedUnit = deg2unitEye(tFovDeg); // degrees 2 unit (arc minutes, seconds or degrees)

  return getCanvasObject(preferedUnit, tFovDeg, tFovDeg);
}
