import React from "react";
import Modal from "../../../Components/Modal";

class TransitionModal extends React.Component {
  state = {
    inputValue: "",
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ inputValue: value });
  };

  handleClose = () => {
    const { handleClose } = this.props;
    this.setState({ inputValue: "" }, handleClose);
  };

  render() {
    const { open, bookSlot, isScheduled } = this.props;
    const { inputValue } = this.state;
    return (
      <Modal open={open} handleClose={this.handleClose}>
        <div>
          <input
            type="name"
            value={inputValue}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <div>
            <button onClick={() => bookSlot(inputValue)}>
              {isScheduled ? "Schedule" : "Reschedule"}
            </button>
          </div>
          <div>
            <button onClick={this.handleClose}>Cancel</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default TransitionModal;
