// remove all isEyepiece

const DEFAULT_INFO_DATA = {
  focalRatio: {
    key: "FR",
    value: "",
    isEyepieceInfo: true,
    isChanged: true,
  },
  aspectRatio: {
    key: "AR",
    value: "",
    isEyepieceInfo: false,
    isChanged: true,
  },
  magnification: {
    key: "CurrMag",
    value: "",
    isEyepieceInfo: true,
    isChanged: false,
  },
  maxMagnification: {
    key: "MaxMag",
    value: "",
    isEyepieceInfo: true,
    isChanged: false,
  },
  pxPerSquare: {
    key: "Grid □",
    value: "",
    isEyepieceInfo: false,
    isChanged: false,
  },
  chipSize: {
    key: "Chip",
    value: "",
    isEyepieceInfo: false,
    isChanged: false,
  },
};

export default DEFAULT_INFO_DATA;