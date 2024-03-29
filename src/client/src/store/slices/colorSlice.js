import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "colors",
  initialState: {
    eyepieceMode: "info",
    cameraMode: "success",
    background: "gradient-dark",
    text: "text-white",
    textMuted: "text-muted",
    canvasBorder: "#7C7C7C",
    canvasText: "#ffffff", // "#9C9C9C",
    canvasGrid: "#2c2c2c",
  },
});

export default slice.reducer;

// Selectors
export const getColors = state => state.colors;
