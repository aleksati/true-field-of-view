import React, { memo } from "react";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import colors from "../../../data/color-data";

const INC = 10;
const Zoom = ({ isEyepieceMode, onZoomChange, zoomValue }) => {
  return (
    <Tooltip title={zoomValue + "%"} placement="bottom">
      <ButtonGroup
        variant="contained"
        size="small"
        color={isEyepieceMode ? colors.eyepieceMode : colors.cameraMode}
        className="mb-2 mt-1"
      >
        <Button
          onClick={() => {
            onZoomChange(zoomValue - INC <= 10 ? 10 : zoomValue - INC);
          }}
        >
          <ZoomOutIcon />
        </Button>
        <Button
          onClick={() => {
            onZoomChange(zoomValue + INC > 100 ? 100 : zoomValue + INC);
          }}
        >
          <ZoomInIcon />
        </Button>
      </ButtonGroup>
    </Tooltip>
  );
};

Zoom.propTypes = {
  isEyepieceMode: PropTypes.bool.isRequired,
  onZoomChange: PropTypes.func.isRequired,
  zoomValue: PropTypes.number.isRequired,
};

export default memo(Zoom);