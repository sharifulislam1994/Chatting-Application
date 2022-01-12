import React, { Component } from "react";
import { Dropdown, Grid, Header } from "semantic-ui-react";
import { getAuth, signOut } from "../../firebase";

export default class UserPanel extends Component {
  dropOptions = () => [
    {
      text: <span>Logged as{this.props.userName}</span>,
      disabled: true,
    },

    {
      text: <span>Change profile picture</span>,
    },
    {
      text: <span onClick={this.handleLogOut}>Log Out</span>,
    },
  ];

  handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Logout");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Header
              as="h1"
              style={{
                fontSize: "30px",
                color: "white",
                marginLeft: "40px",
                marginTop: "20px",
              }}
            >
              TALKY{" "}
            </Header>
          </Grid.Row>
          <Header
            as="h4"
            style={{
              fontSize: "15px",
              color: "white",
              marginLeft: "40px",
              marginTop: "20px",
            }}
          >
            <Dropdown
              trigger={<span>User</span>}
              options={this.dropOptions()}
            ></Dropdown>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}
