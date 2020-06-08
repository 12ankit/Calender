import React from "react";
import SlotDetailsStyles from "./SlotDetails.module.css";

class SlotDetails extends React.Component {
  getClassNameAndStatus = (status) => {
    switch (status) {
      case "scheduled":
        return {
          status: "Scheduled",
          name: "scheduled",
        };
      case "blocked":
        return {
          status: "Blocked",
          name: "blocked",
        };
      default:
        return {
          status: "Open",
          name: "open",
        };
    }
  };

  onDrop = (e) => {
    e.preventDefault();
    const { dragHandler, data, row, column } = this.props;
    const { status, name } = data;
    const incomingStatus = e.dataTransfer.getData("status");
    const incomingName = e.dataTransfer.getData("name");
    const incomingRow = e.dataTransfer.getData("row");
    const incomingColumn = e.dataTransfer.getData("column");

    if (status !== "blocked") {
      dragHandler(Number(incomingRow), Number(incomingColumn), {
        status,
        name,
      });
      dragHandler(row, column, { status: incomingStatus, name: incomingName });
    }
  };

  onDragStart = (e) => {
    const { row, column, data = {} } = this.props;
    const { status, name } = data;
    e.dataTransfer.setData("status", status);
    e.dataTransfer.setData("name", name);
    e.dataTransfer.setData("row", row);
    e.dataTransfer.setData("column", column);
  };

  render() {
    const { data = {}, handleModalOpen } = this.props;
    const { status, name } = this.getClassNameAndStatus(data.status);

    return (
      <div
        className={SlotDetailsStyles[name]}
        onClick={data.status !== "blocked" && (() => handleModalOpen(data))}
        draggable={data.status === "scheduled"}
        onDragStart={this.onDragStart}
        onDrop={this.onDrop}
      >
        <div
          className={SlotDetailsStyles.slot}
        >{`${data.time} ${data.unit}`}</div>
        {data.status !== "scheduled" && <div>{status}</div>}
        <div>{data.name}</div>
      </div>
    );
  }
}

export default SlotDetails;
