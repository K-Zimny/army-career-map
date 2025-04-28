import React, { useState } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";

const ACTIVE_COLOR = "#ffcc01"; // Army Gold
const DEFAULT_COLOR = "#221f20"; // Black

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;

  return (
    <g>
      {/* Render the active slice */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* Render the label and value inside the slice */}
      <text
        x={cx}
        y={cy}
        dy={-5}
        textAnchor="middle"
        fill="#333"
        fontSize={14}
        fontWeight="bold"
      >
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill="#666" fontSize={12}>
        {`$${value.toLocaleString()}`}
      </text>
    </g>
  );
};

const PieChart = ({ data, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      {title && <h2 className="text-l font-normal mb-4">{title}</h2>}
      <ResponsiveContainer width="100%" height={400}>
        <RechartsPieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="40%"
            innerRadius={80} // Increased inner radius
            outerRadius={120} // Increased outer radius
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === activeIndex ? ACTIVE_COLOR : DEFAULT_COLOR}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
