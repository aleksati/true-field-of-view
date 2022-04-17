import React, { useEffect, useState } from "react";
import { getImgPath } from "../../utils/calc";
import {
  getLatLong,
  getAreaCountry,
  getData,
  filterData,
} from "./utils/forecastUtils";
import colors from "../../data/color-data";
import { useSelector } from "react-redux";
import { getMode } from "../../store/slices/canvasDataSlice";

const loadingImg = getImgPath("loading", "loading", ".gif");
const errorImg = getImgPath("error", "error", ".gif");

const Forecast = () => {
  const [forecastData, setForecastData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  const isEyepieceMode = useSelector(getMode);

  // Componemt did mount
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    const fetchData = async () => {
      try {
        const { lat, long } = await getLatLong();
        const { area, country } = await getAreaCountry(lat, long);
        const data = await getData(lat, long);
        const { forecast, forecastTime, forecastDate } = filterData(
          data.properties.timeseries
        );
        const symbol_code = forecast.data.next_6_hours.summary.symbol_code;
        const temperature = forecast.data.instant.details.air_temperature;

        // replace with getImgPath function
        const forecastImg = getImgPath("weather", symbol_code, ".png");

        setForecastData({
          next6h_img: forecastImg,
          next6h_temp: temperature,
          area: area,
          country: country,
          current_date: forecastDate,
          current_time: forecastTime,
        });
        setIsLoading(false);
      } catch (error) {
        alert("Error in mounting Forecast component:", error.message);
        setError(true);
      }
    };
    fetchData();
  }, []);

  const borderStyle = () => {
    let css =
      "info-items text-center " +
      colors.text +
      " col-auto border rounded border-";
    let bg = isEyepieceMode ? colors.eyepieceMode : colors.cameraMode;
    return css + bg;
  };

  if (isError) {
    return (
      <div
        className={
          "border border-white rounded mb-1 col-3 bg-" + colors.background
        }
      >
        <div className="form-label-group mb-0 mt-2 justify-content-center">
          <p className={"mr-1 " + colors.text}>
            <small>Forecast</small>
          </p>
          <p className={borderStyle()}>
            <img src={errorImg} alt="ERROR..." width="25px" height="25px" />
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={
          "border border-white rounded mb-1 col-3 bg-" + colors.background
        }
      >
        <div className="form-label-group mb-0 mt-2 justify-content-center">
          <p className={"mr-1 " + colors.text}>
            <small>Forecast</small>
          </p>
          <p className={borderStyle()}>
            <img src={loadingImg} alt="loading..." width="25px" height="25px" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        "border border-white rounded mb-1 col-3 bg-" + colors.background
      }
    >
      <div className="form-label-group mb-0 mt-2 justify-content-center">
        <p className={"mr-1 " + colors.text}>
          <small>Forecast</small>
        </p>
        <p className={borderStyle()}>
          <img
            src={forecastData.next6h_img}
            alt="Specification Drawing"
            width="25px"
            height="25px"
            className="mr-2"
          />
          {forecastData.next6h_temp}°
        </p>
      </div>
    </div>
  );
};

export default Forecast;
