import React from 'react';
import { useState,useEffect } from 'react';
import './map.css';

//close Button
import {Icon} from '@iconify/react';
import CloseIcon from '@iconify/icons-mdi/close-circle';



//geo code
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBJQaGPESpG-vlcnpajwa3IY0J6MNUIdYg");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");




function InfoBox({info,isShow,vendorDetails,customerDetails}) {
    console.log(customerDetails)
    //address Fetch
    let lat=info.lat.toString();let lng=info.lng.toString()
   
    const [address,setAddress]= useState('');
    let city, state, country;
    Geocode.fromLatLng(lat,lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
         
          for (let i = 0; i < response.results[0].address_components.length; i++) {
            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
              switch (response.results[0].address_components[i].types[j]) {
                case "locality":
                  city = response.results[0].address_components[i].long_name;
                  break;
                case "administrative_area_level_1":
                  state = response.results[0].address_components[i].long_name;
                  break;
                case "country":
                  country = response.results[0].address_components[i].long_name;
                  break;
              }
            }
          }
          let out =`${city},${state},${country}`
          setAddress(out)
        },
        (error) => {
          console.error(error);
        }
      );
    //Finish getting address

    if(info.type=='vendor'){
        return (
            <div className="location-info">
                <Icon icon={CloseIcon} className="location-icon-close" onClick={()=>isShow(false)} />
                <h4>Location Information of vendor</h4>
                <ul>
                    <li>User:<strong>Vendor</strong></li>
                    <li>name:<strong>{info.userName}</strong></li>
                    <li>Location:<strong>{address}</strong></li>
                    {info.vendorOrders.length!=0 &&<h3 className="DeliveryText">Pending Orders</h3>}
                    
                    {info.vendorOrders.map((order)=>{
                        let customer =customerDetails.filter((customer)=>(customer.id==order.customerId))
                        return(
                            <li>{`Drive to deliver order to Customer:${customer[0].username}`}</li>
                        )                    
                    })}
                   
                </ul>
            </div>
        )
    }else{
        return (
            <div className="location-info">
                <Icon icon={CloseIcon} className="location-icon-close" onClick={()=>isShow(false)} />
                <h4>Location Information of Customer</h4>
                <ul>
                    <li>Name:<strong>{info.userName}</strong></li>
                    <li>Location:<strong>{address}</strong></li> 
                    {info.customerOrders.length!=0 &&   <h3 className="DeliveryText">Waiting Orders</h3>}
                  
                    {info.customerOrders.map((order)=>{
                        let vendor =vendorDetails.filter((vendor)=>(vendor.id==order.vendorId))
                        return(
                            <li>{`waiting for order delivery by :${vendor[0].name}`}</li>
                        )                    
                    })}
                   
                </ul>
            </div>
        )
    }

       
    
      
   
   
}

export default InfoBox
