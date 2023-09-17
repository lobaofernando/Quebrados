import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Logoff() {

  const handleLogoff = (event) => {

    console.log(localStorage);
    
    localStorage.removeItem('accessToken')
    localStorage.removeItem('accessTokenExpiration')
    localStorage.removeItem('refreshToken')
    // redirecionar para a tela desejada em caso de login bem sucedido
    window.location.href = '/admin/login';
    
    console.log(localStorage); 
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <Card className="card-upgrade">
              <CardHeader className="text-center">
                <CardTitle tag="h4">Tem certeza que deseja sair?</CardTitle>
                <p className="card-category">
                  Vai ficar Quebrado pra sempre...
                </p>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="6" className="text-center">
                    <Button
                      className="btn-round"
                      color="default"
                      href="#"
                      onClick={() => handleLogoff()}
                    >
                      Sair...
                    </Button>
                  </Col>
                  <Col md="6" className="text-center">
                    <Button
                      className="btn-round"
                      color="primary"
                      href="/admin/dashboard"
                      rel="noopener noreferrer"
                    >
                      Continuar logado
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Logoff;
