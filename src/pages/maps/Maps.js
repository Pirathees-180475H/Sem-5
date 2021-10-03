import { useState } from "react";
import GoogleMapReact from "google-map-react";
import './map.css';
import LocationMarker from "./LocationMarker";
import InfoBox from "./infoBox";
import SearchUser from './SerchUser';
import SearchErrorBox from "./SearchErrorBox";

//grapql import
import { gql, useQuery } from '@apollo/client';

// gql query for geting all orders
const GET_users = gql`
{
  users{
    id
    location{
      Latitude
      Longitude
    }
    username
  }
}`


// gql query for vendors
const GET_Vendors = gql`
{
  vendors{
  	id
    location{
      Latitude
      Longitude
    }
    name
    available

  }
}

`
// gql query for geting all orders
const GET_orders = gql`
{
  orders{
    status
    customerId
    vendorId
  }
}
`
const Maps=() =>{

  // Customer datas From Database
  let CustomerLocations=[]
  const GetUsersData =()=>{
    const {loading,error,data} = useQuery(GET_users)
    return data
  }
  const users_data= GetUsersData();
  
  if(users_data){
    CustomerLocations=users_data.users
  }
  //Finish Customer Data Fetching

  //vendorsData
  let VendorLocations=[]
  const GetVendorsData =()=>{
    const {loading,error,data} = useQuery(GET_Vendors )
    return data
  }
  const vendors_data= GetVendorsData();
  
  if(vendors_data){
    VendorLocations=vendors_data.vendors
  }
  //VendorDataFetchedFrom Finished Database

  //Get Pending Orders From DataBase
  let orders=[]
  const GetOrdersData =()=>{
    const {loading,error,data} = useQuery(GET_orders )
    return data
  }
  const orders_data= GetOrdersData();
  if(orders_data){
    let allOrders=orders_data.orders
    let pendingOrders=allOrders.filter((order)=>(order.status=='pending'))
    orders=pendingOrders
  }

  //End OF pending Orders

  const [center,setCenter]= useState({
    lat:6.9271,
    lng:79.8612
  })

  const zoom=16
  const [locationInfo,setLocationInfo] = useState(null);
  const [isInfoBoxShown,setInfoBoxShown]=useState(false);
  const [isSearchErrorBoxShow,setSearchErrorBoxShow]= useState(false)

  return(
    <div className="map">
      <GoogleMapReact
      bootstrapURLKeys={{key:'AIzaSyBJQaGPESpG-vlcnpajwa3IY0J6MNUIdYg'}}
      center={center}
      defaultZoom={zoom}>

        {VendorLocations.map((vendor)=>{
          let specificOrder = orders.filter((order)=>(order.vendorId==vendor.id));
          return(
            <LocationMarker userType="vendor" key={vendor.id} lat={vendor.location.Latitude} lng={vendor.location.Longitude}  onClick={()=>{setInfoBoxShown(true);setLocationInfo({id:vendor.id,userName:vendor.name,type:'vendor',lat:vendor.location.Latitude,lng:vendor.location.Longitude,vendorOrders:specificOrder})}} />
          )
        })}
        {CustomerLocations.map((customer)=>{
           let specificOrder = orders.filter((order)=>(order.customerId==customer.id));
          return(
            <LocationMarker userType="customer" key={customer.id} lat={customer.location.Latitude} lng={customer.location.Longitude} onClick={()=>{setInfoBoxShown(true);setLocationInfo({id:customer.id,type:'Customer',userName:customer.username,lat:customer.location.Latitude,lng:customer.location.Longitude,customerOrders:specificOrder})}} />
          )
        })}
      </GoogleMapReact>
      

      {isInfoBoxShown && locationInfo && <InfoBox info={locationInfo} isShow={setInfoBoxShown} vendorDetails={VendorLocations} customerDetails={CustomerLocations}/>}
      <SearchUser search={setCenter} setErrorMsg={setSearchErrorBoxShow} VendorLocations={VendorLocations} CustomerLocations={CustomerLocations}/>

      {isSearchErrorBoxShow &&  <SearchErrorBox  setErrorMsg={setSearchErrorBoxShow}/>}
     
    </div>
  )
}



export default Maps