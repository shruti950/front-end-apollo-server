import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { PostsQueries } from "../../queries/queries";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Linecomponents = () => {
  const [Id, _Id] = useState([]);
  const [UserId, _UserId] = useState([]);
  const { data } = useQuery(PostsQueries.getPosts);
  console.log(
    "🚀 ~ file: lineComponents.js ~ line 12 ~ Linecomponents ~ data",
    data
  );
  useEffect(() => {
    data?.posts?.post?.map((post) => {
      if (Id.length !== data?.posts?.post?.length) {
        _Id((prevState) => {
          return [...prevState, parseInt(post.id)];
        });
        _UserId((prevState) => {
          return [...prevState, post.userId];
        });
      }
    });
  }, [data]);
  const options = {
    indexAxis: "y", // for horizontal
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = Id;
  const color = Id.map(
    (id) =>
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      "0.2)"
  );
  const Chartdata = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: UserId,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <Line data={Chartdata} />
        </div>
        <div className="col-md-6">
          <Bar options={options} data={Chartdata} />
        </div>
        <div className="col-md-6">
          <Pie data={Chartdata} />
        </div>
      </div>
    </>
  );
};

export default Linecomponents;
