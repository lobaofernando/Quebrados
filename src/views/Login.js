import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('https://artemiswebapi.azurewebsites.net/api/auth/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('accessTokenExpiration', data.accessTokenExpiration);
      localStorage.setItem('refreshToken', data.refreshToken);
      // redirecionar para a tela desejada em caso de login bem sucedido
      //window.location.href = '/admin/dashboard';
      navigate('/admin/dashboard');
    } else {
      // definir o estado de erro em caso de login mal sucedido
      document.getElementById('erroLogin').style.display = "block";
    }
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNavigate = (path) => {
    console.log(path);
    navigate(path);
  }

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
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <br/>
                        <label>Login</label>
                        <Input
                          placeholder="e-mail"
                          type="text"
                          id="email"
                          value={email}
                          onChange={handleEmailChange}
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
                          type="password"
                          id="password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                    <small id="erroLogin" style={{display: "none", color: "red"}}>*Dados incorretos</small>
                    </div>
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
                    <Col className="ml-auto mr-auto" lg="4" md="12" xs="12">
                      <h5>
                        <small>UNIT</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="12">
                      <button onClick={() => handleNavigate("/admin/user-register")}>Cadastre-se</button>
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

export default Login;
