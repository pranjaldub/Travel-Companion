import React , {useState , useEffect , createRef} from 'react';
import {CircularProgress , Grid , Typography , InputLabel , MenuItem , FormControl , Select} from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../../PlaceDetails/PlaceDetail';
function List({places , childClicked , isLoading , type , setType , rating , setRating}) {
    const classes = useStyles();
    
    const [elrefs , setElrefs] = useState([])
    useEffect(()=>{
        const refs = Array(places?.length).fill().map((_,index) => elrefs[index] || createRef());

        setElrefs(refs);
    },[places])
   
    return (
        <div className={classes.container}>
        <Typography variant='h4'> Restaurants , Hotels and Attractions around you</Typography>
        {isLoading ? (
            <div className={classes.loading}>
                <CircularProgress size="5rem"></CircularProgress>
            </div>) : (
                <>
        <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(event) => setType(event.target.value)}>
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
        </Select>    
        </FormControl>    

        <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(event) => setRating(event.target.value)}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>Above 3.0</MenuItem>
            <MenuItem value={4}>Above 4.0</MenuItem>
            <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>    
        </FormControl>    
        <Grid container spacing={3} className={classes.list}>
            {places?.map((place,index) => (

                <Grid  item key={index} xs={12}><PlaceDetails place={place} selected = {Number(childClicked)=== index}
                refProp={elrefs[index]}
                ></PlaceDetails></Grid>
            ))}

        </Grid>
        </>
        )}
        </div>
    );
}

export default List;