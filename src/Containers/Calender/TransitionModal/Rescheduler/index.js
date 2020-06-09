import React from "react";
import ReschedulerStyles from "./Rescheduler.module.css";

const Rescheduler = ({
  data,
  handleClose,
  handleInputChange,
  handleRescheduling,
}) => (
  <div className={ReschedulerStyles.wrapper}>
    <div className={ReschedulerStyles.name}>{data.name}</div>
    <div
      className={ReschedulerStyles.details}
    >{`${data.day}, ${data.month} ${data.date} at ${data.time}:00${data.unit}`}</div>
    <div className={ReschedulerStyles.actions}>
      <div
        className={`${ReschedulerStyles.button} ${ReschedulerStyles.ok}`}
        onClick={() => {
          handleRescheduling();
          handleInputChange({ target: { value: data.name } });
        }}
      >
        Reschedule
      </div>
      <div
        className={`${ReschedulerStyles.button} ${ReschedulerStyles.cancel}`}
        onClick={handleClose}
      >
        Cancel
      </div>
    </div>
  </div>
);

export default Rescheduler;
