import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";

//grapql import
import { gql, useQuery } from '@apollo/client';

// gql query for geting all orders
const GET_users = gql`
{
  users{
    id
    language
    lastname
    email
    mobile
    paymentMethod
    username
  }
}`

let datatableData = [];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tables() {

  const GetUsersData =()=>{
    const {loading,error,data} = useQuery(GET_users)
    return data
  }
  const users_data= GetUsersData();
  
  if(users_data){
    datatableData= users_data.users;
    console.log(users_data)
  }


  const classes = useStyles();
  return (
    <>
      <PageTitle title="ALL Customers" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="customers List"
            data={datatableData}
            columns={["username", "email", "mobile", "paymentMethod",'language','lastname',"id"]}
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
