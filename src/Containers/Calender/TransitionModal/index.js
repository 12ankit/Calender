import React from "react";
import Modal from "../../../Components/Modal";
import Scheduler from "./Scheduler";
import Rescheduler from "./Rescheduler";

class TransitionModal extends React.Component {
  state = {
    inputValue: "",
    err: false,
    isRescheduling: false,
  };

  handleRescheduling = () => {
    this.setState((prevState) => ({
      isRescheduling: !prevState.isRescheduling,
    }));
  };

  handleInputChange = (event) => {
    const { err } = this.state;
    const value = event.target.value;
    if (value && err) {
      this.setState({ err: false });
    }
    this.setState({ inputValue: value });
  };

  handleClose = () => {
    const { handleClose } = this.props;
    const { isRescheduling } = this.state;
    if (isRescheduling) {
      this.handleInputChange({ target: { value: "" } });
      this.handleRescheduling();
    } else {
      this.setState({ inputValue: "" }, handleClose);
    }
  };

  bookSlot = () => {
    const { bookSlot } = this.props;
    const { isRescheduling, inputValue } = this.state;
    if (isRescheduling && inputValue) {
      this.handleRescheduling();
    }
    if (!inputValue) {
      this.setState({ err: true });
    } else {
      bookSlot(inputValue);
    }
  };

  render() {
    const { open, isScheduled, data, handleRepeat } = this.props;
    const { inputValue, isRescheduling, err } = this.state;
    return (
      <Modal open={open} handleClose={this.handleClose}>
        {isScheduled && !isRescheduling ? (
          <Rescheduler
            handleRepeat={handleRepeat}
            handleRescheduling={this.handleRescheduling}
            data={data}
            handleClose={this.handleClose}
            handleInputChange={this.handleInputChange}
          />
        ) : (
          <Scheduler
            err={err}
            bookSlot={this.bookSlot}
            inputValue={inputValue}
            handleInputChange={this.handleInputChange}
            handleClose={this.handleClose}
          />
        )}
      </Modal>
    );
  }
}

export default TransitionModal;
