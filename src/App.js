import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import PlaceDetail from "./PlaceDetails/PlaceDetail";
import getPlacesData from "./api";
function App() {
  const [places, setPLaces] = useState([]);
  const [bounds, setBounds] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [childClicked, setChildClicked] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      console.log(data);
      console.log(bounds);
      setPLaces(data);

      setLoading(false);
    });
  }, [bounds, coordinates]);
  return (
    <>
      <CssBaseline></CssBaseline>
      <Header></Header>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={loading}
          ></List>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          ></Map>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
