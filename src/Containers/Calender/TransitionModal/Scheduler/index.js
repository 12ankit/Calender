import React from "react";
import SchedulerStyles from "./Scheduler.module.css";

const Scheduler = ({
  bookSlot,
  handleInputChange,
  handleClose,
  inputValue,
}) => (
  <div className={SchedulerStyles.wrapper}>
    <div className={SchedulerStyles.input}>
      <input
        type="name"
        value={inputValue}
        placeholder="Book For"
        onChange={handleInputChange}
      />
    </div>
    <div className={SchedulerStyles.actions}>
      <div
        className={`${SchedulerStyles.button} ${SchedulerStyles.ok}`}
        onClick={() => bookSlot(inputValue)}
      >
        Schedule
      </div>
      <div
        className={`${SchedulerStyles.button} ${SchedulerStyles.cancel}`}
        onClick={handleClose}
      >
        Cancel
      </div>
    </div>
  </div>
);

export default Scheduler;
