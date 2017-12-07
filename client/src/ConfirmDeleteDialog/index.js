import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const btnStyle = {
  margin: 6,
}

export default class ConfirmDeleteDialog extends React.Component {
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleDelete = () => {
    this.props.onDelete()
    this.handleClose()
  }

  render() {
    const actions = [
      <RaisedButton
        label="No"
        primary
        onClick={this.handleClose}
        style={btnStyle}
      />,
      <RaisedButton
        label="Yes"
        secondary
        keyboardFocused={true}
        onClick={this.handleDelete}
        style={btnStyle}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Delete Event"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          onRequestOpen={this.handleOpen}
          dialogOpen={this.handleOpen}
        />
      </div>
    );
  }
}
