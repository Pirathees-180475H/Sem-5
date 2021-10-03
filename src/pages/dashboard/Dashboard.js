import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  //LinearProgress,
  //Select,
  //OutlinedInput,
  //MenuItem,
  //Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  //ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip
  //YAxis,
  //XAxis,
} from "recharts";
import ApexLineChart from "../charts/components/ApexLineChart";
import TotalOrdersChart from "../charts/components/TotalOrdersChart";

//grapql BackEnd
import { gql, useQuery } from '@apollo/client';

// styles
import useStyles from "./styles";


import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
// import Table from "./components/Table/Table";
// import BigStat from "./components/BigStat/BigStat";


let PieChartData = [];
let PieChartData2=[]


// gql query for geting all orders
const GET_orders = gql`
{
  orders{
    id
    totalPrice
    status
    createAt
    paymentMethod
    createAt
    customerId
  }
}
`
const GET_users= gql`
{
  users{
    username
  }
}
`
const GET_vendors= gql`
{
  vendors{
   name
  }
}
`

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  //usersData
  let userCount=0
  const GetusersData =()=>{
    const {loading,error,data} = useQuery(GET_users )
    return data
  }
  const userdata=GetusersData()
  if(userdata){userCount=userdata.users.length}

  //vendorsData
  let vendorsCount=0
  const GetvendorsData =()=>{
    const {loading,error,data} = useQuery(GET_vendors )
    return data
  }
  const vendorsdata=GetvendorsData()
  if(vendorsdata){vendorsCount=vendorsdata.vendors.length}

        // console.log(vendorsCount,userCount)
  PieChartData = [
    { name: "Customers", value:userCount, color: "primary" },
    { name: "Vendors  ", value:vendorsCount, color: "secondary" },
    
  ];
  //ordersdata
  const GetOrdersData =()=>{
    const {loading,error,data} = useQuery(GET_orders )
    return data
  }
  const orders_data= GetOrdersData();
  
  let allOrders =[]
  let pendingOrders=[]
  let deliveredOrders=[]
  let totalPriceFromcash=0;
  let totalPriceFromOnline=0;
  if(orders_data){
    allOrders= orders_data.orders;
    pendingOrders = allOrders.filter((item)=>item.status=='pending')
    deliveredOrders= allOrders.filter((item)=>item.status=='delivered')

    allOrders.map((item)=>{
      if(item.paymentMethod != 'cashOnDelivery'){
        totalPriceFromOnline=totalPriceFromOnline+item.totalPrice
      }else{
        totalPriceFromcash=totalPriceFromcash+item.totalPrice
      }
    })
    PieChartData2 = [
    {name:"Cash",value:totalPriceFromcash,color:'success'},
    {name:"Online",value:totalPriceFromOnline,color:'warning'}
    ]
  }


  //Fetch TodaysOrder
  let currentDateAndTimeObject= new Date(Date.now())
  let TodaysOrders=[]
  let CurrentdateAndTimestring =`${currentDateAndTimeObject.getDate()}.${currentDateAndTimeObject.getMonth()}.${currentDateAndTimeObject.getFullYear()}`

  if(orders_data){
    orders_data.orders.forEach(order => {
      let dateAndtimeObject=new Date(order.createAt._seconds *1000)
      let dateAndTimestring =`${dateAndtimeObject.getDate()}.${dateAndtimeObject.getMonth()}.${dateAndtimeObject.getFullYear()}`
      if(dateAndTimestring==CurrentdateAndTimestring){
        TodaysOrders.push(order)
      }
    });
  }
  
 //Total sales Data
 const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 },
  { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 },
];
  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Total Orders"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            {/* {data.users.map(user=><text> {user.email }</text> )} */}
            {/* {data.products.map(product=><text> {JSON.stringify(product) }</text> )} */}

            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
               {allOrders.length}
              </Typography>
              
                </Grid>
                <Grid item xs={6}>
              <LineChart
                width={100}
                height={30}
                data={[
                  { value: 10 },
                  { value: 20 },
                  { value: 10 },
                  { value: 17 },
                  { value: 18 },
                ]}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Delivered
                </Typography>
                <Typography size="md">{deliveredOrders.length}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                 Pending
                </Typography>
                <Typography size="md">{pendingOrders.length}</Typography>
              </Grid>
              
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Total Transation" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={PieChartData2}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {PieChartData2.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {PieChartData2.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Total Products"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            {/* {data.users.map(user=><text> {user.email }</text> )} */}
            {/* {data.products.map(product=><text> {JSON.stringify(product) }</text> )} */}

            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
               {allOrders.length}
              </Typography>
              
                </Grid>
                <Grid item xs={6}>
              <LineChart
                width={100}
                height={30}
                data={[
                  { value: 50 },
                  { value: 200 },
                  { value: 100 },
                  { value: 107 },
                  { value: 0 },
                ]}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                 Companies
                </Typography>
                <Typography size="md">3</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                Categories
                </Typography>
                <Typography size="md">5</Typography>
              </Grid>
              
            </Grid>
          </Widget>
        </Grid>

     

        
        
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Total Users" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={PieChartData}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {PieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {PieChartData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>


      
        <Grid item lg={6} xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Total Orders
                </Typography>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <TotalOrdersChart/>
            </ResponsiveContainer>
          </Widget>
        </Grid>


        <Grid item lg={6} xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Daily Joined Users
                </Typography>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <ApexLineChart/> 
            </ResponsiveContainer>
            
          </Widget>
        </Grid>
       
        
      <Grid item xs={12}>
        <MUIDataTable
           title="Todays Order"
          data={TodaysOrders}
          columns={["id", "totalPrice", "paymentMethod", "status",'customerId']}
          options={{
            selectableRows:false
          }}
          
        />
      </Grid>
        
      </Grid>
    </>
  );
}


// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
