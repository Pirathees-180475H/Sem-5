import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useEffect,useState } from "react";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

// Vendors data from gql
import { gql, useQuery ,useLazyQuery} from '@apollo/client';

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

  }
}

`

const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))


export default function Tables() {
  
  const GetVendorsData =()=>{
    const {loading,error,data} = useQuery(GET_Vendors )
    return data
  }
  const vendors_data= GetVendorsData();
  
  if(vendors_data){
   // console.log(vendors_data.vendors)
  }


  const classes = useStyles();
  if (vendors_data){
      return (
        <>
          <PageTitle title="All Vendors" />
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                title="Vendor List"
                data={vendors_data.vendors}
                columns={["name", "email","registrationNumber","rating", "priceRating","id"]}
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
                </Grid>
        </>
      );
    
  }else{
    return(
      <>
      <PageTitle title="All Vendors" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="vendors List"
            data={[]}
            columns={["name", "rating", "City", "State"]}
            options={{
              filterType: "checkbox",
             
            }}
          />
        </Grid>
            </Grid>
    </>
    )
  }
 
 
}
