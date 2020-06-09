import React from "react";
import CalenderStyles from "./Calender.module.css";
import Table from "./Table";
import TransitionModal from "./TransitionModal";
import { xAxis, yAxis } from "./constants";

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

  slotDataHandler = (row, column, data) => {
    const { slotData } = this.state;
    slotData[row][column] = { ...slotData[row][column], ...data };
    this.setState({ slotData });
  };

  handleModalOpen = (row, column) => (data) => {
    this.setState({
      open: true,
      selected: { row, column, status: data.status },
    });
  };

  handleModalClose = () => {
    this.setState({ open: false });
  };

  bookSlot = (text) => {
    const { selected, slotData } = this.state;
    const { row, column } = selected;
    slotData[row][column] = {
      ...slotData[row][column],
      name: text,
      status: "scheduled",
    };

    this.setState({ slotData: [...slotData] }, this.handleModalClose);
  };

  render() {
    const { open, selected, slotData } = this.state;
    return (
      <div
        className={CalenderStyles.wrapper}
        onDragOver={(e) => e.preventDefault()}
      >
        <Table
          slotData={slotData}
          slotDataHandler={this.slotDataHandler}
          handleModalOpen={this.handleModalOpen}
        />
        <TransitionModal
          open={open}
          data={slotData[selected.row][selected.column]}
          handleClose={this.handleModalClose}
          bookSlot={this.bookSlot}
          isScheduled={selected.status === "scheduled"}
        />
      </div>
    );
  }
}

export default Calender;
