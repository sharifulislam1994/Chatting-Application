import React, { Component } from "react";
import { getAuth } from "../firebase";
import { connect } from "react-redux";
import { setuser } from "../actions";
import { clearuser } from "../actions";
import { Dimmer, Grid, Loader, Segment } from "semantic-ui-react";

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import MetaPanel from "./MetaPanel/MetaPanel";
import Message from "./Message/Message";

class App extends Component {
  componentDidMount() {
    console.log(this.props.isLoading);
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setuser(user);
      } else {
        this.props.clearuser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Segment style={{ height: "100vh" }}>
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      </Segment>
    ) : (
      <>
        <Grid colums="equal" className="app">
          <Grid.Column style={{ width: "5%" }}>
            <ColorPanel></ColorPanel>
          </Grid.Column>

          <Grid.Column style={{ width: "20%" }}>
            <SidePanel userName={this.props.userName.displayName}></SidePanel>
          </Grid.Column>

          <Grid.Column style={{ width: "50%" }}>
            <Message></Message>
          </Grid.Column>

          <Grid.Column style={{ width: "25%" }}>
            <MetaPanel></MetaPanel>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  userName: state.user.currentUser,
});

export default connect(mapStateToProps, { setuser, clearuser })(App);
