import React from "react";
import { TrendData } from "../../../staticData/TrendsData";
import "./TrendCardStyle.css";
const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Trends for your</h3>

      {TrendData.map((trend, id) => {
        return (
          <div className="trend" key={id}>
            <span>#{trend.name}</span>
            <span>{trend.shares}k shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
