import React from "react";
import CalenderStyles from "./Calender.module.css";
import SlotDetails from "./SlotDetails";
import Modal from "../../Components/Modal";
import { xAxis, yAxis, days } from "./constants";

class Calender extends React.Component {
  state = {
    slotData: [],
    open: false,
    selected: {
      row: 0,
      column: 0,
    },
  };

  static getDerivedStateFromProps(props, state) {
    const { slotData } = state;
    yAxis.forEach((rowData, rowIndex) => {
      slotData[rowIndex] = [];
      xAxis.forEach((columnData, columnIndex) => {
        slotData[rowIndex][columnIndex] = { ...rowData, ...columnData };
      });
    });
    return { slotData };
  }

  handleModalOpen = (row, column) => () => {
    this.setState({ open: true, selected: { row, column } });
  };

  handleModalClose = () => {
    this.setState({ open: false });
  };

  slotChangeHandler = (row, column) => (data) => {
    const { slotData } = this.state;
    slotData[row][column] = { ...slotData[row][column], ...data };
    this.setState({ slotData });
  };

  renderSlotDetails = (row, timeData) => {
    const { slotData } = this.state;
    const comps = [];
    for (let i = 0; i < days; i++) {
      comps.push(
        <td>
          <SlotDetails
            data={slotData[row][i]}
            handleModalOpen={this.handleModalOpen(row, i)}
          />
        </td>
      );
    }
    return comps;
  };

  render() {
    const { open, selected } = this.state;
    return (
      <div className={CalenderStyles.wrapper}>
        <table className={CalenderStyles.table}>
          <th />
          {xAxis.map((item) => (
            <th>
              <div>{item.day}</div>
              <div>{item.date}</div>
            </th>
          ))}
          {yAxis.map((item, index) => (
            <tr>
              <td>{`${item.time} ${item.unit}`}</td>
              {this.renderSlotDetails(index, item)}
            </tr>
          ))}
        </table>
        <Modal
          open={open}
          updateSlot={this.slotChangeHandler(selected.row, selected.column)}
          handleClose={this.handleModalClose}
        />
      </div>
    );
  }
}

export default Calender;
