import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper , Typography , useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

function Map({setCoordinates , setBounds , coordinates , places , setChildClicked}) {
    const classes = useStyles();
    const isdesktop = useMediaQuery('(min-width:600px)');
 
    const apiKey='AIzaSyAxa12JFywRlvpcxrKJ6F2ZplivkDnDQB8';
    return (
        <div className={classes.mapContainer}>

            <GoogleMapReact
                bootstrapURLKeys={{key:apiKey}}
                defaultCenter = {coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={
                    (event) => {setCoordinates({lng:event.center.lng , lat:event.center.lat});
                                setBounds({ne:event.marginBounds.ne , sw: event.marginBounds.sw})               
                }}
                onChildClick={(child)=>{setChildClicked(child)}}
            >
                {places?.map((place,index) => (
                    <div className={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng = {Number(place.longitude)}
                    ke={index}>

                    {!isdesktop ? (<LocationOnOutlinedIcon color='primary' fontSize='large'></LocationOnOutlinedIcon>) :(<Paper elevation={3} className={classes.paper}>
                        <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                            {place.name}
                        </Typography>
                        <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                 alt={place.name}
                 />
                 <Rating size='small' value={Number(place.rating)} readOnly></Rating>
                    </Paper>)}
                    </div>
                ))}

            </GoogleMapReact>
        </div>
    );
}

export default Map;