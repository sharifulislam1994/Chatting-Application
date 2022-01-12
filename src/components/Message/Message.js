import React, { Component } from "react";
import { Comment, Segment } from "semantic-ui-react";
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";

export default class Message extends Component {
  render() {
    return (
      <div>
        <Segment>
          <MessageHeader />
        </Segment>
        <Segment style={{ height: "500px", overflowY: "scroll" }}>
          <Comment.Group></Comment.Group>
        </Segment>
        <Segment>
          <MessageForm />
        </Segment>
      </div>
    );
  }
}
