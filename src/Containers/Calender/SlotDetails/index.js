import React from "react";
import SlotDetailsStyles from "./SlotDetails.module.css";

class SlotDetails extends React.Component {
  render() {
    const { data, handleModalOpen } = this.props;
    return (
      <div className={SlotDetailsStyles.wrapper} onClick={handleModalOpen}>
        <div>{`${data.time} ${data.unit}`}</div>
        <div>{data.status || "Open"}</div>
      </div>
    );
  }
}

export default SlotDetails;
