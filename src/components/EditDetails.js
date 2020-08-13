import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI stuff
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
//Redux
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userAction";

const styles = {
  textField: {
    margin: "5px auto 5px auto",
  },
  button: {
    float: "right",
  },
};

class EditDetails extends Component {
  state = {
    bio: "",
    location: "",
    website: "",
    open: false,
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapStateToDetails(credentials);
  }
  handleOpen = () => {
    this.setState({ open: true });
    this.mapStateToDetails(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  mapStateToDetails = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      location: credentials.location ? credentials.location : "",
      website: credentials.website ? credentials.website : "",
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit Details" placement="bottom">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Your Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                fullWidth
                className={classes.textField}
                placeholder="Type about yourself"
                value={this.state.bio}
                onChange={this.handleChange}
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                fullWidth
                className={classes.textField}
                placeholder="Enter personal/professional website"
                value={this.state.website}
                onChange={this.handleChange}
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                fullWidth
                className={classes.textField}
                placeholder="Where are you from?"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
