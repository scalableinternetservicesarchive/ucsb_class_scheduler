import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
      <FlatButton
        label="No"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleDelete}
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
