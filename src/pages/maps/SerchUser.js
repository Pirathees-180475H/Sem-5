import React from 'react';
import './map.css';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';


function SerchUser({search,setErrorMsg,VendorLocations,CustomerLocations}) {
    const [userId,setuserId]= React.useState(''); 
    const changeHandler=(e)=>{
        setuserId(e.target.value)
    }
    const searchHandle=()=>{
        //fetch user or vendor From list of datas
        console.log(userId,VendorLocations,CustomerLocations)
        const vendor =VendorLocations.filter((vendor)=>{return(vendor.name==userId)});
        const customer =CustomerLocations.filter((customer)=>{return(customer.username==userId)});
        let location={}
        if(customer.length!=0){
            location.lat=customer[0].location.Latitude;location.lng=customer[0].location.Longitude
        }else if(vendor.length!=0){
            location.lat=vendor[0].location.Latitude;location.lng=vendor[0].location.Longitude
        }else{
            setErrorMsg(true)
        }
        search(location);
    }
    return (

        <div className="search">
        <Toolbar>
        <TextField
            id="input-with-icon-textfield"
            label="SearchBy Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
        variant="standard"
        onChange={(eve)=>{changeHandler(eve)}}
      />
          <SearchIcon onClick={searchHandle}  />
        </Toolbar>
        </div>
    )
}

export default SerchUser
