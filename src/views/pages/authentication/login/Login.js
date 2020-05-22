import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { Mail, Lock, Check, Facebook, Twitter, GitHub } from "react-feather";
import { history } from "../../../../history";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import googleSvg from "../../../../assets/img/svg/google.svg";
import client from "../../../../configs/apollo";
import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
const autenticar_usuario = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;
const Login = (props) => {
  const [state, setState] = useState({
    activeTab: "1",
    email: "",
    password: "",
    valid: true,
    isEmail: true,
  });
  const [auth, { data, error }] = useMutation(autenticar_usuario);
  if (error) {
    console.log(error);
  }
  const toggle = (tab) => {
    if (state.activeTab !== tab) {
      setState({
        activeTab: tab,
      });
    }
  };
  console.log(data);
  if (data && data.autenticarUsuario) {
    localStorage.setItem("token", data.autenticarUsuario.token);
    client.resetStore();
    history.push("/");
  }
  const submit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    if (email !== "" && password !== "") {
      auth({ variables: { input: { email, password } } }).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col
              lg="6"
              className="d-lg-block d-none text-center align-self-center px-1 py-0"
            >
              <img src={loginImg} alt="loginImg" />
            </Col>
            <Col lg="6" md="12" className="p-0">
              <Card className="rounded-0 mb-0 px-2">
                <CardBody>
                  <h4>Login</h4>
                  <p>Welcome back, please login to your account.</p>
                  <Form onSubmit={submit}>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={state.email}
                        onChange={(e) => {
                          const email = e.target.value;
                          var mediumRegex = new RegExp(
                            "^([a-z0-9!#$%&+/=?^_`.{|}~-]+(?:.[a-z0-9!#$%&+/=?^_`{|}~-]+))@([a-z0-9]+)?(.[a-z0-9]+)(.[a-z0-9]+)(.[a-z0-9-.com]+)$"
                          );
                          let isEmail = true;
                          if (!mediumRegex.test(email)) {
                            isEmail = false;
                          }

                          setState({ ...state, email, isEmail });
                        }}
                        invalid={!state.isEmail}
                      />
                      <FormFeedback invalid={!state.valid}>
                        Is not a available email
                      </FormFeedback>
                      <div className="form-control-position">
                        <Mail size={15} />
                      </div>
                      <Label>Email</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={state.password.valid}
                        onChange={(e) => {
                          const password = e.target.value;
                          var mediumRegex = new RegExp(
                            "^([a-zA-Z0-9!{}+><$@%&./()=*#_-]{8,30})$"
                          );
                          let valid = true;
                          if (!mediumRegex.test(password)) {
                            valid = false;
                          }

                          setState({ ...state, password, valid });
                        }}
                        invalid={!state.valid}
                      />
                      <FormFeedback invalid={!state.valid}>
                        Is not a available password the password must be at
                        least 8 characters long
                      </FormFeedback>
                      <div className="form-control-position">
                        <Lock size={15} />
                      </div>
                      <Label>Password</Label>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-between align-items-center">
                      <Checkbox
                        color="primary"
                        icon={<Check className="vx-icon" size={16} />}
                        label="Remember me"
                      />
                      <div className="float-right">Forgot Password?</div>
                    </FormGroup>
                    <div className="d-flex justify-content-between">
                      <Button.Ripple
                        color="primary"
                        outline
                        onClick={() => history.push("/pages/register")}
                      >
                        Sign-up
                      </Button.Ripple>
                      <Button.Ripple color="primary" type="submit">
                        Sign-in
                      </Button.Ripple>
                    </div>
                  </Form>
                </CardBody>
                {/* <div className="auth-footer">
                  <div className="divider">
                    <div className="divider-text">OR</div>
                  </div>
                  <div className="footer-btn">
                    <Button.Ripple className="btn-facebook" color="">
                      <Facebook size={14} />
                    </Button.Ripple>
                    <Button.Ripple className="btn-twitter" color="">
                      <Twitter size={14} stroke="white" />
                    </Button.Ripple>
                    <Button.Ripple className="btn-google" color="">
                      <img
                        src={googleSvg}
                        alt="google"
                        height="15"
                        width="15"
                      />
                    </Button.Ripple>
                    <Button.Ripple className="btn-github" color="">
                      <GitHub size={14} stroke="white" />
                    </Button.Ripple>
                  </div>
                </div> */}
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
