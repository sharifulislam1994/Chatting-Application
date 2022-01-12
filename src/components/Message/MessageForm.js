import React, { Component } from "react";
import { Button, Message, Input } from "semantic-ui-react";
import { getDatabase, ref, set, push, onValue } from "../../firebase";

export default class MessageForm extends Component {
  state = {
    msg: "",
    err: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlesubmit = (e) => {
    if (this.state.msg) {
      const db = getDatabase();
      const groupRef = ref(db, "messages");
      const newGroupRef = push(groupRef);
      set(newGroupRef, {
        msg: this.state.msg,
      }).then(() => {
        console.log("msg gecghe database e");
      });

      this.setState({ err: " " });
    } else {
      this.setState({ err: "Add a message" });
    }
  };
  render() {
    return (
      <div>
        <Input
          name="msg"
          onChange={this.handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder="Aa"
        ></Input>
        {this.state.err ? (
          <Message negative>
            <Message.Header>{this.state.err}</Message.Header>
          </Message>
        ) : (
          ""
        )}

        <Button onClick={this.handlesubmit} style={{ width: "49%" }} primary>
          Add Message
        </Button>
        <Button style={{ width: "49%" }} secondary>
          Add Media
        </Button>
      </div>
    );
  }
}
