import React from "react";
import CalenderStyles from "./Calender.module.css";
import Table from "./Table";
import TransitionModal from "./TransitionModal";
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
  };

  static getDerivedStateFromProps(props, state) {
    const { slotData } = state;
    if (!slotData.length) {
      yAxis.forEach((rowData, rowIndex) => {
        slotData[rowIndex] = [];
        xAxis.forEach((columnData, columnIndex) => {
          const data = { ...rowData, ...columnData };
          if (rowIndex === 2) {
            data.name = "Ankit";
            data.status = "scheduled";
          }
          if (rowIndex === 1 && columnIndex === 4) {
            data.name = "Rohan";
            data.status = "scheduled";
          }
          if (rowIndex === 3 && columnIndex === 1) {
            data.name = "Neha";
            data.status = "scheduled";
          }
          if (rowIndex === 4 && columnIndex === 3) {
            data.name = "Manish";
            data.status = "scheduled";
          }
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

  handleRepeat = (row) => (data) => {
    const { slotData } = this.state;
    for (let columnIndex = 1; columnIndex < days - 1; columnIndex++) {
      const newData = slotData[row][columnIndex];

      this.slotDataHandler(row, columnIndex, {
        ...newData,
        status: data.status,
        name: data.name,
      });
    }
    this.handleModalClose();
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
          handleRepeat={this.handleRepeat(selected.row)}
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
