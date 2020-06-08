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
  render() {
    const { data = {}, handleModalOpen } = this.props;
    const { status, name } = this.getClassNameAndStatus(data.status);

    return (
      <div
        className={SlotDetailsStyles[name]}
        onClick={data.status !== "blocked" && (() => handleModalOpen(data))}
      >
        <div
          className={SlotDetailsStyles.slot}
        >{`${data.time} ${data.unit}`}</div>
        {status !== "Scheduled" && <div>{status}</div>}
        <div>{data.name}</div>
      </div>
    );
  }
}

export default SlotDetails;
