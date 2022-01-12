import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Segment,
  Header,
  Icon,
  Message,
} from "semantic-ui-react";
import { getAuth, signInWithEmailAndPassword } from "../../firebase";
import { Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMsg: "",
    loader: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isFormEmpty = ({ email, password }) => {
    if (!email.length || !password.length) {
      this.setState({ errorMsg: "Fill the All field" });
    } else if (password.length < 5) {
      this.setState({
        errorMsg: "Passwords should contain more than 5 charecter",
      });
    } else {
      return true;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isFormEmpty(this.state)) {
      this.setState({ loader: true });
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {
          console.log(userCredential);
          this.setState({ loader: false });
        })
        .catch((error) => {
          this.setState({ loader: false });
          const errorCode = error.code;
          if (errorCode.includes("user")) {
            this.setState({ errorMsg: "Email not matched" });
          } else if (errorCode.includes("wrong-password")) {
            this.setState({ errorMsg: "Wrong Password" });
          }
        });
    }
  };

  render() {
    const { email, password, errorMsg, successMsg, loader } = this.state;

    return (
      <div>
        <Grid textAlign="center" style={{ marginTop: "80px" }}>
          <Grid.Column style={{ maxWidth: "500px" }}>
            <Header as="h2" icon>
              <Icon name="universal access" />
              Let's join Talky
            </Header>

            {errorMsg ? (
              <Message negative>
                <Message.Header>{errorMsg}</Message.Header>
              </Message>
            ) : (
              ""
            )}

            {successMsg ? (
              <Message positive>
                <Message.Header>{successMsg}</Message.Header>
              </Message>
            ) : (
              ""
            )}

            <Segment raised>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field
                  className={errorMsg.includes("Email") ? "error" : ""}
                >
                  <label style={{ textAlign: "left" }}>Email</label>
                  <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={email}
                  />
                </Form.Field>
                <Form.Field
                  className={errorMsg.includes("Password") ? "error" : ""}
                >
                  <label style={{ textAlign: "left" }}>Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={password}
                  />
                </Form.Field>
                <Button
                  className={loader ? "loading primary disabled" : ""}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Segment>
            <Message>
              <Message.Header>
                Don't Have an Account?<Link to="/registration">Sign Up</Link>
              </Message.Header>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
