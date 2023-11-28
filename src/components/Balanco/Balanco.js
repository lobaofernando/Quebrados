import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardFooter, Col, Row } from 'reactstrap';

const Balanco = () => {
  const [gastos, setGastos] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);

  useEffect(() => {
    // Lógica para calcular o balanço com base nos dados disponíveis
    const calcularBalanco = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = {
          mode: 'no-cors',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          `https://artemiswebapi.azurewebsites.net/api/Categoria/ObterGastos?pagina=0`,
          { headers }
        );
        const data = await response.json();
        setGastos(data);
        console.log("ronaldo")
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    calcularBalanco();
    calcularTotais(gastos);
  });

  const calcularTotais = (itens) => {
    if (!itens || !itens.length) {
      console.error("A variável 'itens' está vazia ou não é uma array.");
      return null;
    }
  
    let totalEntradas = 0;
    let totalSaidas = 0;
  
    for (let i = 0; i < itens.length; i++) {
      const item = itens[i];
  
      if (!item || !item.tipo || !item.valor) {
        console.error(`Item inválido encontrado na posição ${i}.`);
        continue; // Pula para a próxima iteração se encontrar um item inválido
      }
  
      if (item.tipo === 1) {
        totalEntradas += item.valor;
      } else if (item.tipo === 2) {
        totalSaidas += item.valor;
      } else {
        console.error(`Tipo de item desconhecido na posição ${i}.`);
        continue; // Pula para a próxima iteração se encontrar um tipo de item desconhecido
      }
    }
  
    setSaldo(totalEntradas - totalSaidas);
    setSaidas(totalSaidas);
    setEntradas(totalEntradas);
  };

  const formatValue = (value) => {
    const formattedValue = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(value);
    return formattedValue;
  };

  return (
    <Row>
      <Col lg="4" md="6" sm="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-money-coins text-success" />
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <p className="card-category">Saldo</p>
                  <CardTitle tag="p">{formatValue(saldo)}</CardTitle>
                  <p />
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats">
            </div>
          </CardFooter>
        </Card>
      </Col>
      <Col lg="4" md="6" sm="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center icon-warning">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" color="green" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: "green" }}>
                    <path d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z"></path>
                  </svg>
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <p className="card-category">Entradas</p>
                  <CardTitle tag="p">{formatValue(entradas)}</CardTitle>
                  <p />
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats">
            </div>
          </CardFooter>
        </Card>
      </Col>
      <Col lg="4" md="6" sm="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center icon-warning">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" color="red" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: "red" }}>
                    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-316v116h-67c-10.7 0-16 12.9-8.5 20.5l99 99c4.7 4.7 12.3 4.7 17 0l99-99c7.6-7.6 2.2-20.5-8.5-20.5h-67V140c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12z"></path>
                  </svg>
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <p className="card-category">Saídas</p>
                  <CardTitle tag="p">{formatValue(saidas)}</CardTitle>
                  <p />
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats">
            </div>
          </CardFooter>
        </Card>
      </Col>
  </Row>
  );
};

export default Balanco;
