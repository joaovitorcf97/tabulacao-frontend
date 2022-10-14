import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';
import './styles.css';

function Dashboard() {
  const data = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  };
  const data2 = {
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E']
  };


  return (
    <div className="container-users">
      <div className="breadcrumb">
        <Link to={'/home/dashboard'}>Dashboard</Link>
      </div>
      <h1>Dashboard</h1>
      <div className="chats-dashboard">
        <Chart
          options={data.options}
          series={data.series}
          type="bar"
          width="500"
        />
        <Chart options={data2.options} series={data2.series} type="donut" width="380" />
        <Chart
          options={data.options}
          series={data.series}
          type="line"
          width="500"
        />
      </div>
    </div>
  );
}

export { Dashboard };

