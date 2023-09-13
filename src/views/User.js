/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function User() {
  return (
    <>
      <div className="content">
        <Row>
        <Col md="4">
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <h5 className="title">Quebrados</h5>
                  </a>
                </div>
                <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <br/>
                        <label>Login</label>
                        <Input
                          placeholder="e-mail"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Senha</label>
                        <Input
                          placeholder="********"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Entrar
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        <small>UNIT</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <a href="http://localhost:3000/admin/dashboard">Cadastre-se</a>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
