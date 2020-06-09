import React from "react";
import TableStyles from "./Table.module.css";
import SlotDetails from "../SlotDetails";
import { xAxis, yAxis, days } from "../constants";

const Table = ({ slotData, slotDataHandler, handleModalOpen }) => (
  <table className={TableStyles.table}>
    <th />
    {xAxis.map((item) => (
      <th>
        <div>{item.day}</div>
        <div>{item.date}</div>
      </th>
    ))}
    {yAxis.map((item, rowIndex) => {
      const rowComps = [];
      for (let columnIndex = 0; columnIndex < days; columnIndex++) {
        rowComps.push(
          <td>
            <SlotDetails
              data={slotData[rowIndex][columnIndex]}
              row={rowIndex}
              column={columnIndex}
              dragHandler={slotDataHandler}
              handleModalOpen={handleModalOpen(rowIndex, columnIndex)}
            />
          </td>
        );
      }
      return (
        <tr>
          <td>{`${item.time} ${item.unit}`}</td>
          {rowComps}
        </tr>
      );
    })}
  </table>
);

export default Table;
