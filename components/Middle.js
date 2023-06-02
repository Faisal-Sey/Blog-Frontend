import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import authService from '../services/authServices'
import blogServices from "../services/blogServices";
import { STATUS_CODE } from "../utils/systemSettings";



const Middle = ({type, active}) => {

  const [state, setState] = useState(null)

  useEffect(() => {

    let isDone = false

    const getData = async() => {

      if (active === "views"){
        const data_labels = []

        const data_values = []
        try{
          const refresh = await authService.refreshToken({})
          const res = await blogServices.getAnalytics({})
          if (res?.status === STATUS_CODE.SUCCESS){
            for (const value of Object.entries(res?.data.data[type])){
              data_labels.push(value[0])
              data_values.push(value[1])
            }
          
            const data = {
              labels: data_labels,
              datasets: [
                {
                  label: "",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgb(87,190,248)",
                  borderColor: "rgb(199,21,133)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(199,21,133)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(67, 56, 202)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 4,
                  pointHitRadius: 10,
                  data: data_values,
                },
              ],
            };

            setState(<Bar data={data} />)
          }
        }catch(err){}
      }

      else if (active === "comments"){
        const data_labels = []

        const data_values = []
        try{
          const refresh = await authService.refreshToken({})
          const res = await blogServices.commentAnalytics({})
          if (res?.status === STATUS_CODE.SUCCESS){
            for (const value of Object.entries(res?.data.data[type])){
              data_labels.push(value[0])
              data_values.push(value[1])
            }
          
            const data = {
              labels: data_labels,
              datasets: [
                {
                  label: "",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgb(87,190,248)",
                  borderColor: "rgb(199,21,133)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(199,21,133)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(67, 56, 202)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 4,
                  pointHitRadius: 10,
                  data: data_values,
                },
              ],
            };

            setState(<Bar data={data} />)
          }
        }catch(err){}
      }

      else if (active === "urlClicks"){
        const data_labels = []

        const data_values = []
        try{
          const refresh = await authService.refreshToken({})
          const res = await blogServices.clickAnalytics({})
          if (res?.status === STATUS_CODE.SUCCESS){
            for (const value of Object.entries(res?.data.data[type])){
              data_labels.push(value[0])
              data_values.push(value[1])
            }
          
            const data = {
              labels: data_labels,
              datasets: [
                {
                  label: "",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgb(87,190,248)",
                  borderColor: "rgb(199,21,133)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(199,21,133)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(67, 56, 202)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 4,
                  pointHitRadius: 10,
                  data: data_values,
                },
              ],
            };

            setState(<Bar data={data} />)
          }
        }catch(err){}
      }

      else if (active === "visitors"){
        const data_labels = []

        const data_values = []
        try{
          const refresh = await authService.refreshToken({})
          const res = await blogServices.visitorsAnalytics({})
          if (res?.status === STATUS_CODE.SUCCESS){
            for (const value of Object.entries(res?.data.data[type])){
              data_labels.push(value[0])
              data_values.push(value[1])
            }
          
            const data = {
              labels: data_labels,
              datasets: [
                {
                  label: "",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgb(87,190,248)",
                  borderColor: "rgb(199,21,133)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgb(199,21,133)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(67, 56, 202)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 4,
                  pointHitRadius: 10,
                  data: data_values,
                },
              ],
            };

            setState(<Bar data={data} />)
          }
        }catch(err){}
      }
    }

    if (!(isDone)){
      getData();
    }

    return () => {
      isDone = true
    }

  }, [])

    return (
      <div className=" bg-white p-2 ml-14 shadow-sm w-8/12">
        <div className="border-b p-3 border-gray-100">
          <h3 className="font-semibold text-2xl text-gray-700">Overall Posts Activity</h3>
          <p className="text-sm mt-1">{type} Post Views</p>
        </div>
        <div>
          {state}
        </div>
      </div>
    );

};

export default Middle;
