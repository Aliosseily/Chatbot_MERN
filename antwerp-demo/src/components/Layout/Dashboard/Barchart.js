import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Barchart = (props) => {

  return (
    <div style={{ maxWidth: "95%" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={props.data.months}>
          <XAxis dataKey="month" stroke="#2cb1bc" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="amount" fill="#2cb1bc" barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
