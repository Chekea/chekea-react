import React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 400 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

const ChartBox = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Sales Chart
        </Typography>
        <LineChart width={400} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default ChartBox;
