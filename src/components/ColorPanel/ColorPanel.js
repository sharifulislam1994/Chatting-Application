import React, { Component } from "react";
import { Menu, Sidebar, Divider, Button } from "semantic-ui-react";

export default class ColorPanel extends Component {
  render() {
    return (
      <div>
        <Sidebar
          as={Menu}
          icon="labeled"
          inverted
          vertical
          visible
          width="very thin"
        >
          <Divider />
          <Button icon="add" size="small" color="blue"></Button>
        </Sidebar>
      </div>
    );
  }
}
