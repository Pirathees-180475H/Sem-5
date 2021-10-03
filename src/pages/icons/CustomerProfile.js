import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Grid} from "@mui/material"
import Paper from "@material-ui/core/Paper";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import {FormControl} from '@mui/material';
import {InputLabel} from '@mui/material';
import {OutlinedInput} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { gql, useQuery } from '@apollo/client';
import ErrorPopup from './ErrorPopup';
import './errorMsg.css';


//Query To Get Customerdata
// gql query for geting all orders
const GET_users = gql`
{
  users{
    createAt
    id
    language
    lastname
    email
    mobile
    paymentMethod
    username
    address{
      city
      street
    }
  }
}`

//Order query
const GET_orders = gql`
{
  orders{
    totalPrice
    customerId
    vendorId
  }
}
`

const n= 0;
const data=[
  {
  name:'Isad Brazal',
  age:'23',
  latitude:1.675899040,
  longitude:'106.57499',
  address: 'No. 383, Waragoda, Kelaniya',
  contact: '0718152428',
  email:'isad@gamil.com',
  totalOrder:19,
  totalTran:23,
  photo:"https://as1.ftcdn.net/v2/jpg/02/95/88/44/1000_F_295884439_YnuB9UG1DnDiqvMhUcgPstenlhuA4H1T.jpg"
}
]

const defaultCustomer={
  photo:"https://as1.ftcdn.net/v2/jpg/02/95/88/44/1000_F_295884439_YnuB9UG1DnDiqvMhUcgPstenlhuA4H1T.jpg"
}

const CustomerProfile=React.forwardRef((props,ref)=> {
    const [isErrorPopupShow,setIsErrorPopupShow]=React.useState(false);
    const [userName,setUserName] = React.useState('') //For searching
    const [customer,setCustomer]=React.useState(defaultCustomer) //actual customer Object
    const [specificOrdersCount,setCount]=React.useState(0);
    const [specificTransaction,setTransaction]=React.useState(0);


    //Geting CustomerData From Firestore
    const GetUsersData =()=>{
      const {loading,error,data} = useQuery(GET_users)
      return data
    }
    const users_data= GetUsersData();
    //End of geting  customer data

    //start getting  order data
  const GetOrdersData =()=>{
    const {loading,error,data} = useQuery(GET_orders )
    return data
  }
  const orders_data= GetOrdersData();
  //End of orderData

  const changeHandler=(event)=>{
        setUserName(event.target.value)
      }
  const clickHandler=()=>{
      if(users_data){
        let speficicUser=users_data.users.filter((user)=>{return(user.username==userName)})
        if(speficicUser.length!=0){
          setCustomer(speficicUser[0]);
          let cus=speficicUser[0];
          if(orders_data){
            let count=GetOrderCount(orders_data.orders,cus); setCount(count)
            let transaction=GetTotalTranaction(orders_data.orders,cus);setTransaction(transaction)
          }
        }else{console.log('Notfounded');setIsErrorPopupShow(true)}
      }
      }

  // date  for vendor joined Date and address
  let dateAndtimeObject;
  let dateAndTimestring;
  let address;
  if(customer&& customer!=defaultCustomer){
     address=`${customer.address.city}-${customer.address.street}`
     dateAndtimeObject=new Date(customer.createAt._seconds *1000)
     dateAndTimestring =`${dateAndtimeObject.getDate()}.${dateAndtimeObject.getMonth()}.${dateAndtimeObject.getFullYear()}`
  }
    
  console.log(customer)
  return (
<MuiThemeProvider >
<React.Fragment >  
<div ref={ref}> 
    <Box border='0.1px solid grey'>

    <AppBar position="static"  title="Customer Report" style={{backgroundColor:'gray',color:'black', alignItem:'center'}}>
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



<Grid container justifyContent='center' padding='20px'>
      <div>
        <Paper variant="outlined">
          <img src={defaultCustomer.photo} alt='customer' width='300' alignItems='center' justifyContent='center' border='5px dashed grey'  />
        </Paper>
      </div>
</Grid>

      <Grid container alignItems='center' justifyContent='center' padding='20px' >
    <Box
      component="form"
      sx={{alignItems:'center', justifyContent:'center',border:'0.5px solid grey' , padding:'30px', 
        '& .MuiTextField-root': { m: 1, width: '25ch',  },
      }}
      noValidate
      autoComplete="off"
    >

      
<div>

<TextField
          id="standard-read-only-input"
          label="User Name"
          defaultValue={"Customer"}
          value={customer.username}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          
        />
  <TextField
          id="standard-read-only-input"
          label="Joined"
          defaultValue={"Joined Date"}
          value={dateAndTimestring}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
</div>





      <div>

      <TextField
          id="outlined-read-only-input"
          label="language"
          defaultValue={"Language"}
          value={customer.language}
          InputProps={{
            readOnly: true,
          }}
          sx={{
            paddingBottom:'20px'
          }}
        />

      <TextField
          id="outlined-read-only-input"
          label="Payment"
          defaultValue={"Payment Method"}
          value={customer.paymentMethod}
          InputProps={{
            readOnly: true,
          }}
        />
        
        
        <div>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Address</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={address}
            defaultValue={"Customer Address"}
            label="Amount"
          />
          </FormControl>
          </div>
       
        
      </div>
      <div>

      <div>
        <TextField
          id="standard-read-only-input"
          label="Contact No"
          defaultValue={"Phone Number"}
          value={customer.mobile}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        /> 
      
      
        <TextField
          id="standard-read-only-input"
          label="Email"
          defaultValue={"example@yahoo.com"}
          value={customer.email}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        /> 
        
      </div>
        
        
      <div>  
      <TextField
          id="filled-read-only-input"
          label="Total orders"
          value={specificOrdersCount}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

      <TextField
          id="filled-read-only-input"
          label="Total transactions"
          value={specificTransaction}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        
      </div>
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


function GetOrderCount(orders,customer){
  let specificOrders=orders.filter((order)=>(order.customerId==customer.id))
  return specificOrders.length;
}

function GetTotalTranaction(orders,customer){
  let transaction=0;
  let specificOrders=orders.filter((order)=>(order.customerId==customer.id))
  specificOrders.forEach((order)=>(transaction=transaction+order.totalPrice))
  return transaction

}

export default CustomerProfile;
