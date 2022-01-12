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
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  getDatabase,
  ref,
  set,
} from "../../firebase";
import { Link } from "react-router-dom";

export default class Registration extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errorMsg: "",
    successMsg: "",
    loader: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isFormEmpty = ({ username, email, password, confirmpassword }) => {
    if (
      !username.length ||
      !email.length ||
      !password.length ||
      !confirmpassword.length
    ) {
      this.setState({ errorMsg: "Fill the All field" });
    } else if (password.length < 5 || confirmpassword.length < 5) {
      this.setState({
        errorMsg: "Passwords should contain more than 5 charecter",
      });
    } else if (password !== confirmpassword) {
      this.setState({ errorMsg: "Passwords doesn't match" });
    } else {
      return true;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isFormEmpty(this.state)) {
      this.setState({ loader: true });
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((userCredential) => {
          console.log(userCredential);
          updateProfile(auth.currentUser, {
            displayName: this.state.username,
          })
            .then(() => {
              this.writeUserData(userCredential);
            })

            .then(() => {
              this.setState({ username: "" });
              this.setState({ email: "" });
              this.setState({ password: "" });
              this.setState({ confirmpassword: "" });
              this.setState({ errorMsg: "" });
              this.setState({ successMsg: "Account created successfully" });
              this.setState({ loader: false });
            })
            .catch((error) => {
              this.setState({ loader: false });
              const errorCode = error.code;
              if (errorCode) {
                this.setState({ errorMsg: "User name is not valid" });
              }
            });
        })
        .catch((error) => {
          this.setState({ loader: false });
          const errorCode = error.code;
          if (errorCode.includes("email")) {
            this.setState({ errorMsg: "Email is already in use" });
            console.log("error email");
          }
        });
    }
  };

  writeUserData = (user) => {
    const db = getDatabase();
    set(ref(db, "users/" + user.user.uid), {
      username: this.state.username,
    });
  };

  render() {
    const {
      username,
      email,
      password,
      confirmpassword,
      errorMsg,
      successMsg,
      loader,
    } = this.state;

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
                <Form.Field>
                  <label style={{ textAlign: "left" }}>User Name</label>
                  <input
                    name="username"
                    type="text"
                    placeholder="User Name"
                    onChange={this.handleChange}
                    value={username}
                  />
                </Form.Field>
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
                <Form.Field
                  className={errorMsg.includes("Password") ? "error" : ""}
                >
                  <label style={{ textAlign: "left" }}>Confirm Password</label>
                  <input
                    name="confirmpassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    value={confirmpassword}
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
                Already Have an Account?<Link to="/login">Login</Link>
              </Message.Header>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
