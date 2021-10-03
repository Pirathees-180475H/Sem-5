import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Grid} from "@mui/material"
import Paper from "@material-ui/core/Paper";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ErrorPopup from './ErrorPopup';
import './errorMsg.css';


//pdf Print
import { useReactToPrint } from 'react-to-print';
import{forwardRef} from 'react';

//for Get all vendors
//grapql BackEnd
import { gql, useQuery } from '@apollo/client';
// gql query
const GET_Vendors = gql`
{
  vendors{
  	id
  	createAt
    email
    duration
    location{
      Latitude
      Longitude
    }
    name
    priceRating
    courier{
      name
    }
    rating
    registrationNumber
    available
    address{
      city
      street
    }

  }
}

`
const GET_orders = gql`
{
  orders{
    totalPrice
    customerId
    vendorId
  }
}
`

const defaultVendorDetails= {
  createAt:'',
  email:'',
  name:'',
  priceRating:'',
  rating:'',
  registrationNumber:'',
  photo:'https://images.unsplash.com/photo-1587380341844-80d936b297a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'
}

const VendorProfile= React.forwardRef((props,ref)=> {
  const [vendor,setVendor]=React.useState(defaultVendorDetails) // specific Vendor
  const [vendorName,setVendorName]= React.useState(''); // set userName for search
  const [isErrorPopupShow,setIsErrorPopupShow]=React.useState(false);
  const [specificOrdersCount,setCount]=React.useState(null);
  const [specificTransaction,setTransaction]=React.useState(0);

  const changeHandler=(event)=>{
    setVendorName(event.target.value)
  }

  // vendors data
  const GetVendorsData =()=>{
    const {loading,error,data} = useQuery(GET_Vendors )
    return data
  }
  const vendors_data= GetVendorsData();
  //Finish Vendors data

  //start order data
  const GetOrdersData =()=>{
    const {loading,error,data} = useQuery(GET_orders )
    return data
  }
  const orders_data= GetOrdersData();

  //End of orderData

  const clickHandler=()=>{
    if(vendors_data){
      let speficicVendorArray=vendors_data.vendors.filter((vendor)=>{return(vendor.name==vendorName)})
      let fetchedVendor=speficicVendorArray[0];
      if(speficicVendorArray.length!=0){
        setVendor(fetchedVendor)
        if(orders_data){
          let count=GetOrderCount(orders_data.orders,fetchedVendor); setCount(count)
          let transaction=GetTotalTranaction(orders_data.orders,fetchedVendor);setTransaction(transaction)
        }
      }else{setIsErrorPopupShow(true)}
    }
  }
 
  // date  for vendor joined Date and address
  let dateAndtimeObject;
  let dateAndTimestring;
  let address;
  if(vendor&& vendor!=defaultVendorDetails){
     address=`${vendor.address.city}-${vendor.address.street}`
     dateAndtimeObject=new Date(vendor.createAt._seconds *1000)
     dateAndTimestring =`${dateAndtimeObject.getDate()}.${dateAndtimeObject.getMonth()}.${dateAndtimeObject.getFullYear()}`
  }
  return (
<MuiThemeProvider >
<React.Fragment >  

<div ref={ref}> 
<Box border='0.1px solid grey'>
<AppBar position="static"  title="Vendor Report" style={{backgroundColor:'#5C6BC0',color:'black', justifyContent:'center', alignItem:'center'}}>
        <Toolbar>
        <TextField
            id="input-with-icon-textfield"
            label="SearchBy Id"
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
          <SearchIcon onClick={clickHandler} />
        </Toolbar>
        
</AppBar>

<div>
<Grid container justifyContent = "center" padding='20px' >
      <div>
        <Paper variant="outlined">
          <img src={defaultVendorDetails.photo} alt='Vendor' width='250' alignItems='center' justifyContent='center' border='5px dashed grey' />
        </Paper>
      </div>
</Grid>
</div>
<Grid container justifyContent = "center" alignItems='center' paddingBottom='120px' >
    <Box
      component="form"
      sx={{alignItems:'center', justifyContent:'center' , padding:'30px',
        '& .MuiTextField-root': { m: 1, width: '25ch',  },
      }}
      noValidate
      autoComplete="off"
    >

      
<div className="DetailBox">


<TextField
          id="standard-read-only-input"
          label="Title"
          defaultValue="Name of the Vendor"
          value={vendor.name}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />

  <TextField
          id="standard-read-only-input"
          label="Registration No"
          defaultValue="Company Registration Number"
          value={vendor.registrationNumber}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />

<TextField
          id="standard-read-only-input"
          label="Email"
          defaultValue="Vendor Mail"
          value={vendor.email}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />



</div>
<div className="DetailBox">
{

}
<TextField
          id="standard-read-only-input"
          label="Joined Date"
          defaultValue="Vendor Joined Date"
          value={dateAndTimestring}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          
        />
  <TextField
          id="standard-read-only-input"
          label="Address"
          defaultValue="Address of vendor"
          value={address}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />

      <TextField
          id="standard-read-only-input"
          label="Price Rating"
          defaultValue="Price Rate"
          value={vendor.priceRating}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />

</div>

      

      <div className="DetailBox">
        <TextField
          id="standard-read-only-input"
          label="Rating"
          defaultValue="Customer Rating"
          value={vendor.rating}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        /> 
      
      
        <TextField
          id="standard-read-only-input"
          label="Total Orders "
          defaultValue="Count"
          value={specificOrdersCount}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        /> 
        
        <TextField
          id="standard-read-only-input"
          label="Total Transaction "
          defaultValue="Transaction"
          value={specificTransaction}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        /> 
        
      </div>
        
      </Box>
  </Grid>

      
  </Box>
  {isErrorPopupShow &&  <ErrorPopup isShow={setIsErrorPopupShow}/>}
 
        </div>
      </React.Fragment>
      </MuiThemeProvider>
      
    
  );
})

function GetOrderCount(orders,vendor){
  let specificOrders=orders.filter((order)=>(order.vendorId==vendor.id))
  return specificOrders.length;
}

function GetTotalTranaction(orders,vendor){
  let transaction=0;
  let specificOrders=orders.filter((order)=>(order.vendorId==vendor.id))
  specificOrders.forEach((order)=>(transaction=transaction+order.totalPrice))
  return transaction

}

export default VendorProfile;
