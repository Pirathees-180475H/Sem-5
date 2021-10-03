import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";

//grapql import
import { gql, useQuery } from '@apollo/client';

// gql query for geting all orders
const GET_orders = gql`
{
  orders{
    totalPrice
    status
    createAt
    transactionId
    customerId
    vendorId
  }
}
`

let datatableData = [];


const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Orders() {
  let currentDateAndTimeObject= new Date(Date.now())
  let TodaysOrders=[]
  let CurrentdateAndTimestring =`${currentDateAndTimeObject.getDate()}.${currentDateAndTimeObject.getMonth()}.${currentDateAndTimeObject.getFullYear()}`


  const GetOrdersData =()=>{
    const {loading,error,data} = useQuery(GET_orders )
    return data
  }
  const orders_data= GetOrdersData();
  
  if(orders_data){
    datatableData= orders_data.orders;
    datatableData.forEach(order => {
      let dateAndtimeObject=new Date(order.createAt._seconds *1000)
      let dateAndTimestring =`${dateAndtimeObject.getDate()}.${dateAndtimeObject.getMonth()}.${dateAndtimeObject.getFullYear()}`
      if(dateAndTimestring==CurrentdateAndTimestring){
        TodaysOrders.push(order)
      }
    });
  }

 
  const classes = useStyles();
  return (
    <>
      <PageTitle title="ALL Orders" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Orders List"
            data={datatableData}
            columns={["transactionId", "totalPrice", "status", "customerId",'vendorId']}
            options={{
              filterType: "checkbox",
              downloadOptions:{
                filterOptions:{
                  useDisplayedColumnsOnly:true,
                  useDisplayedRowsOnly:true
                }
              },
             
              selectableRows:false
            }}
          />
        </Grid>
        {/* 
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid> */}
      </Grid>
    </>
  );
}
