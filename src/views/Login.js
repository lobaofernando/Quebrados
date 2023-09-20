import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Alternar entre mostrar/ocultar a senha
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="content login-container d-flex align-items-center justify-content-center">
      <Row>
        <Col md="2" />
        <Col md="8">
          <Card className="card-user" style={{padding: '60px', textAlign: 'center' }}>
            <div className="image"></div>
            <CardBody>
              <div className="author">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <h5 className="title" style={{ fontSize: '32px' }}>
                    Quebrados
                  </h5>
                </a>
              </div>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label style={{ fontSize: '20px' }}>Login</label>
                      <Input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        style={{ fontSize: '25px' }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label style={{ fontSize: '20px' }}>Senha</label>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'} // Alterar o tipo com base na visibilidade da senha
                          id="password"
                          value={password}
                          onChange={handlePasswordChange}
                          style={{ fontSize: '30px' }}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText
                            onClick={toggleShowPassword}
                            style={{ cursor: 'pointer', fontSize: '18px' }}
                          >
                            {showPassword ? '👁️' : '🔒'}{' '}
                            {/* Mostrar/ocultar ícone de olho */}
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <small
                      id="erroLogin"
                      style={{ display: 'none', color: 'red', fontSize: '20px' }}
                    >
                      *Dados incorretos
                    </small>
                  </div>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button
                      className="btn-round"
                      color="primary"
                      type="submit"
                      style={{ fontSize: '20px' }}
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
   
                  </Col>
                  <Col className="mr-auto" lg="12">
                    <button
                      onClick={() => handleNavigate('/admin/user-register')}
                      className="btn btn-link"
                      style={{ fontSize: '20px' }}
                    >
                      Cadastre-se
                    </button>
                  </Col>
                </Row>
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col md="2" />
      </Row>
    </div>
  );
};

export default Login;
