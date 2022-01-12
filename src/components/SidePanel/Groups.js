import React, { Component } from "react";
import {
  Header,
  Icon,
  Button,
  Modal,
  Form,
  Message,
  Menu,
} from "semantic-ui-react";
import { getDatabase, ref, set, push, onValue } from "../../firebase";
import { connect } from "react-redux";
import { setcurrentgroup } from "../../actions";

class Groups extends Component {
  state = {
    groups: [],
    modal: false,
    groupname: "",
    grouptagline: "",
    err: "",
    firstload: true,
    active: "",
  };

  openmodal = () => {
    this.setState({ modal: true });
  };

  closemodal = () => {
    this.setState({ modal: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isFormValid(this.state)) {
      const db = getDatabase();
      const groupRef = ref(db, "groups");
      const newGroupRef = push(groupRef);
      set(newGroupRef, {
        groupname: this.state.groupname,
        grouptagline: this.state.grouptagline,
        createdBy: this.props.userName,
      }).then(() => {
        this.setState({ modal: false });
        this.setState({ groupname: "" });
        this.setState({ grouptagline: "" });
        this.setState({ err: "" });
      });
    } else {
      this.setState({ err: "Fill the all the all information " });
    }
  };

  isFormValid = ({ groupname, grouptagline }) => {
    if (groupname && grouptagline) {
      return true;
    } else if (groupname && grouptagline) {
      return false;
    }
  };

  componentDidMount() {
    let groupsafterload = [];
    const db = getDatabase();
    const groupRef = ref(db, "groups");

    onValue(groupRef, (snapshot) => {
      snapshot.forEach((item) => {
        let groupdata = {
          id: item.key,
          groupname: item.val().groupname,
          grouptagline: item.val().grouptagline,
          createdBy: item.val().createdBy,
        };
        groupsafterload.push(groupdata);
      });
      this.setState({ groups: groupsafterload }, this.addgrouponload);
    });
  }

  addgrouponload = () => {
    let firstgroup = this.state.groups[0];
    if (this.state.firstload && this.state.groups.length > 0) {
      this.props.setcurrentgroup(firstgroup);
      this.setState({ active: firstgroup.id });
    }
    this.setState({ firstload: false });
  };

  groupChange = (group) => {
    this.setState({ active: group.id });
    this.props.setcurrentgroup(group);
  };

  render() {
    return (
      <div>
        <Header
          style={{ color: "white", marginTop: "30px", marginLeft: "10px" }}
        >
          <Icon name="group" style={{ display: "inline-block" }}></Icon>
          Groups({this.state.groups.length})
          <Icon
            onClick={this.openmodal}
            name="add square"
            style={{ marginLeft: "50px", display: "inline-block" }}
          ></Icon>
        </Header>

        <Menu
          text
          vertical
          style={{ color: "white", marginTop: "30px", marginLeft: "10px" }}
        >
          {this.state.groups.map((item) => (
            <Menu.Item
              onClick={() => this.groupChange(item)}
              style={item.id == this.state.active ? menulistactive : menulist}
            >
              {item.groupname}
            </Menu.Item>
          ))}
        </Menu>

        <Modal
          basic
          onClose={false}
          onOpen={true}
          open={this.state.modal}
          size="small"
        >
          <Header icon>
            <Icon name="group" />
            Add group details
          </Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field
                className={this.state.err.includes("Fill") ? "error" : ""}
              >
                <label style={{ color: "white" }}>Group Name</label>
                <input
                  onChange={this.handleChange}
                  name="groupname"
                  placeholder="Group Name"
                />
              </Form.Field>
              <Form.Field
                className={this.state.err.includes("Fill") ? "error" : ""}
              >
                <label style={{ color: "white" }}>Group tagline</label>
                <input
                  onChange={this.handleChange}
                  name="grouptagline"
                  placeholder="Group tagline"
                />
              </Form.Field>
            </Form>
            {this.state.err ? (
              <Message negative>
                <Message.Header>{this.state.err}</Message.Header>
              </Message>
            ) : (
              ""
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add Group
            </Button>

            <Button onClick={this.closemodal} basic color="red" inverted>
              <Icon name="remove" /> Cancle
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

let menulist = {
  color: "#fff",
  fontSize: "16px",
};

let menulistactive = {
  color: "#ff0000",
  fontSize: "20px",
  background: "#fff",
  padding: "10px",
  borderRadius: "30px",
};

export default connect(null, { setcurrentgroup })(Groups);
