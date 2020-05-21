import React from "react";
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
} from "reactstrap";
import {
  Mail,
  Lock,
  Check,
  Facebook,
  Twitter,
  GitHub,
  Gitlab,
  Linkedin,
} from "react-feather";
import { history } from "../../../../history";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import googleSvg from "../../../../assets/img/svg/google.svg";

import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";
import Axios from "axios";
import Modal from "../../../../utility/context/Modal";

class Register extends React.Component {
  state = {
    activeTab: "1",
    email: "",
    password: "",
    confirmPassword: "",
    modal: false,
    msg: "A email was send for Confirmation",
    title: "Succed",
  };
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  closeModal = () => {
    this.setState({ modal: false });
    this.props.history.push("/pages/login");
  };
  handleSubmit = (e) => {
    const { confirmPassword, email, password } = this.state;
    console.log("hola");
    e.preventDefault();
    // Axios.post("https://backend.admintools.io/signup", {
    //   email,
    //   password,
    //   confirmPassword,
    // }).then((response) => {
    //   this.setState({ modal: true });
    // });
  };
  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Modal
          modal={this.state.modal}
          close={this.closeModal}
          msg={this.state.msg}
          title={this.state.title}
        />
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
                    <h4>Register</h4>
                    <p>Welcome back, please register to your account.</p>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                        />
                        <div className="form-control-position">
                          <Mail size={15} />
                        </div>
                        <Label>Email</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                        />
                        <div className="form-control-position">
                          <Lock size={15} />
                        </div>
                        <Label>Password</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          value={this.state.confirmPassword}
                          onChange={(e) =>
                            this.setState({ confirmPassword: e.target.value })
                          }
                        />
                        <div className="form-control-position">
                          <Lock size={15} />
                        </div>
                        <Label>Password</Label>
                      </FormGroup>
                      <div className="d-flex justify-content-between">
                        <Button.Ripple
                          color="primary"
                          outline
                          onClick={() => history.push("/pages/login")}
                        >
                          Sign-in 
                        </Button.Ripple>
                        <Button.Ripple color="primary" type="submit">
                          Sign-up
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                  <div className="auth-footer">
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
                      <Button.Ripple className="btn-google" color="">
                        <Gitlab size={14} stroke="white" />
                      </Button.Ripple>
                      <Button.Ripple className="btn-linkedin" color="">
                        <Linkedin size={14} stroke="white" />
                      </Button.Ripple>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Register;
