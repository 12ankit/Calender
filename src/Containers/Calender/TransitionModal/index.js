import React from "react";
import Modal from "../../../Components/Modal";
import Scheduler from "./Scheduler";
import Rescheduler from "./Rescheduler";

class TransitionModal extends React.Component {
  state = {
    inputValue: "",
    isRescheduling: false,
  };

  handleRescheduling = () => {
    this.setState((prevState) => ({
      isRescheduling: !prevState.isRescheduling,
    }));
  };

  handleInputChange = (event) => {
    const value = event.target.value;
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
    if (isRescheduling) {
      this.handleRescheduling();
    }
    bookSlot(inputValue);
  };

  render() {
    const { open, isScheduled, data } = this.props;
    const { inputValue, isRescheduling } = this.state;
    return (
      <Modal open={open} handleClose={this.handleClose}>
        {isScheduled && !isRescheduling ? (
          <Rescheduler
            handleRescheduling={this.handleRescheduling}
            data={data}
            handleClose={this.handleClose}
            handleInputChange={this.handleInputChange}
          />
        ) : (
          <Scheduler
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
