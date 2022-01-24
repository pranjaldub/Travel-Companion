import React from "react";
import axios from "axios";

async function getPlacesData(type, sw, ne) {
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
  try {
    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": "a35f127b5emshf9ed3ae7b851ea0p122669jsn568cb9930287",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default getPlacesData;
