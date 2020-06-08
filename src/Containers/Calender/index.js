import React from "react";
import CalenderStyles from "./Calender.module.css";
import SlotDetails from "./SlotDetails";
import Modal from "../../Components/Modal";
import { xAxis, yAxis, days } from "./constants";

const getData = (rowIndex, columnIndex, data) => {
  if (
    rowIndex === 0 ||
    rowIndex === 5 ||
    rowIndex === 11 ||
    columnIndex === 0 ||
    columnIndex === 6
  ) {
    return {
      ...data,
      status: "blocked",
    };
  }
  return data;
};

class Calender extends React.Component {
  state = {
    slotData: [],
    open: false,
    selected: {
      row: 0,
      column: 0,
      status: "",
    },
    inputValue: "",
  };

  static getDerivedStateFromProps(props, state) {
    const { slotData } = state;
    if (!slotData.length) {
      yAxis.forEach((rowData, rowIndex) => {
        slotData[rowIndex] = [];
        xAxis.forEach((columnData, columnIndex) => {
          const data = { ...rowData, ...columnData };
          const modifiedData = getData(rowIndex, columnIndex, data);
          slotData[rowIndex][columnIndex] = modifiedData;
        });
      });
      return { slotData };
    }
  }

  handleModalOpen = (row, column) => (data) => {
    this.setState({
      open: true,
      selected: { row, column, status: data.status },
      inputValue: data.name,
    });
  };

  handleModalClose = () => {
    this.setState({ open: false, inputValue: "" });
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ inputValue: value });
  };

  bookSlot = () => {
    const { selected, inputValue, slotData } = this.state;
    const { row, column } = selected;
    slotData[row][column] = {
      ...slotData[row][column],
      name: inputValue,
      status: "scheduled",
    };

    this.setState({ slotData: [...slotData] }, this.handleModalClose);
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
    const { open, inputValue, selected } = this.state;
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
        <Modal open={open} handleClose={this.handleModalClose}>
          <div>
            <input
              type="name"
              value={inputValue}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <div>
              <button onClick={this.bookSlot}>
                {selected.status !== "scheduled" ? "Schedule" : "Reschedule"}
              </button>
            </div>
            <div>
              <button onClick={this.handleModalClose}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Calender;
