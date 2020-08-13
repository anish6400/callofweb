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
  CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
//Redux
import { connect } from "react-redux";
import { addPost, clearErrors } from "../redux/actions/dataAction";

const styles = {
  textField: {
    margin: "5px auto 5px auto",
  },
  button: {
    float: "right",
  },
  progress: {
    position: "absolute",
  },
};

class AddPost extends Component {
  state = {
    body: "",
    open: false,
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, body: "" });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const postDetails = {
      body: this.state.body,
    };
    this.props.addPost(postDetails);
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        <Tooltip title="Add Post" placement="bottom">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <AddIcon style={{ color: "#fff" }} />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Add your Post Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="body"
                type="text"
                label="Body"
                fullWidth
                className={classes.textField}
                placeholder="Type your post"
                value={this.state.body}
                onChange={this.handleChange}
                helperText={errors.body}
                error={errors.body ? true : false}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              color="primary"
              disabled={loading}
            >
              Post
              {loading ? (
                <CircularProgress size={20} className={classes.progress} />
              ) : null}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

AddPost.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  addPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { addPost, clearErrors })(
  withStyles(styles)(AddPost)
);
