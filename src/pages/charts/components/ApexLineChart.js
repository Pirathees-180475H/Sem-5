import React from "react";
import ApexCharts from "react-apexcharts";
import { useTheme } from "@material-ui/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography,Grid,Button } from "@material-ui/core";
import { ReactFragment } from "react";

const dateFromDB=['2021-01-05','2021-05-25','2021-02-15','2021-06-06','2021-07-04','2021-04-05','2021-06-07'] //from db,format yyyy/mm/dd
const customerCountFromDB=[31, 40, 28, 51, 42, 109, 100] // from db
const VendorCountFromDB=[11, 32, 45, 32, 34, 52, 41]//fro db

// Change and get date, month console.log(new Date(date[1]).getDate())


export default function ApexLineChart() {
  const [customerCount,setCustomerCount]= React.useState(customerCountFromDB);
  const [vendorCount,setVendorCount] = React.useState(VendorCountFromDB);
  const [xaxisDates,setDates]=React.useState(dateFromDB);
  const [startDate,setStartDate]= React.useState(null);
  const [endDate,setEndDate]= React.useState(null);
  const [filterButtonIsDisabled,setFilterButton]= React.useState(true);

  React.useEffect(()=>{
    
  },[xaxisDates,vendorCount,customerCount])
  
  const users = [
    {
      name: "Customers",
      data: customerCount,
      
    },
    {
      name: "Vendors",
      data: vendorCount,
    },
  ];

  const filterHandler =()=>{
    const enterdStartDate= `${startDate.getYear()+1900}-${startDate.getMonth()+1}-${startDate.getDate()}`;
    const enteredEndDate =`${endDate.getYear()+1900}-${endDate.getMonth()+1}-${endDate.getDate()}`;
    console.log(Date.parse(enterdStartDate))
    dateFromDB.map((item)=>console.log(Date.parse(item)))

    const num=[4,45,6,6]
    
  
    const filteredDate=  dateFromDB.filter((item)=>{
      return((Date.parse(item)>Date.parse(enterdStartDate)) && (Date.parse(item)<Date.parse(enteredEndDate)))
    })
    console.log(filteredDate);
    

  {/*date Format yy/mm/dd for Compare dates
     console.log(Date.parse('2021-05-01'))
     console.log(Date.parse('2021-05-10'))
     console.log(Date.parse('2021-08-05')) */}
     

    // need to filter and set customer, vendor data,dates
    
  }

  return (
      <div>
    <ApexCharts
      options={{
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5]
        },
       
        legend: {
          tooltipHoverFormatter: function(val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: xaxisDates,
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val 
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                }
              }
            }
          ]
        },
        grid: {
          borderColor: '#f1f1f1',
        }
        }}

      series={users}
      type="line"
      height={350}
    /> {/* 
        <Grid
            container
            direction="row"
            justify="space-between"
        >
            <Grid item xs={4}>
            <Typography   noWrap>
               Start Date
            </Typography>
            <Typography size="md"><DatePicker placeholderText={'Enter Start Date'} selected={startDate} onChange={(date)=>setStartDate(date)} maxDate={new Date()}/></Typography>
            
           
            </Grid>

            <Grid item xs={4} mt={2}>
            <Typography  noWrap>
                End Date
            </Typography>
            <Typography size="md"><DatePicker placeholderText ={'Enter End Date'} selected={endDate} onChange={(date)=>setEndDate(date)}/></Typography>
            
            </Grid>

            <Grid item xs={4}>
            <Typography  noWrap>
                submit
            </Typography>
            <Typography  noWrap>
            <Button variant="contained" color="primary" size='small'  onClick={()=>filterHandler()}> 
                Filter
            </Button>
            </Typography>
            </Grid>
          </Grid>
            */}
        
     
    </div>
  );
}


