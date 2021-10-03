import React from "react";
import ApexCharts from "react-apexcharts";
import { useTheme } from "@material-ui/styles";

//grapql BackEnd
import { gql, useQuery } from '@apollo/client';
const GET_orders = gql`
{
  orders{
    id
    createAt
    paymentMethod
  }
}
`
export default function TotalOrdersChart() {
  // Get And ModiFy data
    //ordersdata
  const GetOrdersData =()=>{
      const {loading,error,data} = useQuery(GET_orders )
      return data
    }
    
  let orders_data= GetOrdersData();
  let orders=[];
  let modifiedOrders=[];
  if(orders_data){
    orders =orders_data.orders
    modifiedOrders=  orders.map((order)=>{
      let dateAndtimeObject=new Date(order.createAt._seconds *1000)
      let dateAndTimestring =`${dateAndtimeObject.getDate()}.${dateAndtimeObject.getMonth()}.${dateAndtimeObject.getFullYear()}`
      return(
        {
          'id':order.id,
          'date':dateAndTimestring,
          'method':order.paymentMethod
        }
      )
    })
  }

  //filter and get dates countwise
  let chartData= NewCounter(modifiedOrders)

  const series = [
    {
      name: "Orders",
      data: chartData.counts,
    }
  ];

  var theme = useTheme();

{/** 
  let xAxisDate=[]
  if(orders_data){
    orders_data.orders.forEach(order => {
      
      let dateAndTimestring =`${dateAndtimeObject.getDate()}.${dateAndtimeObject.getMonth()}.${dateAndtimeObject.getFullYear()}`
      xAxisDate.push(dateAndTimestring)
    });
  }
*/}

  return (
    <ApexCharts
      options={{dataLabels: {
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
        categories:chartData.dates,
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
      }}}
      series={series}
      type="line"
      height={350}
    />
  );
}

///function to return for a Graph

function NewCounter(data){
  let array1=[]
  data.forEach(obj => {
    if(!array1.includes(obj.date)){
      array1.push(obj.date)
    }
  })
  //console.log(array1)
  let array2=[]
  array1.forEach((date)=>{
    let c=0;
    let method='';
    data.forEach((item)=>{
      if(item.date==date){
        c=c+1;
      }
    })
    array2.push({'date':date,'count':c,'method':method})
  })
  
  array2.sort((obj1,obj2)=>{
    if(process(obj1.date)>process(obj2.date)){
      return 1
    }else{
      return -1
    }
  })

  function process(date){
    var parts = date.split(".");
    return new Date(parts[2], parts[1] - 1, parts[0]);
 }
  let dateArray=[];
  let countArray=[];
  array2.forEach(obj => {
      dateArray.push(obj.date)
      countArray.push(obj.count)
  })

  return ({'dates':dateArray,'counts':countArray})
}