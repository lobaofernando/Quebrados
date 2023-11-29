import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Col } from "reactstrap";

const GastosAno = () => {
  const [array, setArray] = useState([]);
  const [array2, setArray2] = useState([]);

  useEffect(() => {
    const obterDados = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          `https://artemiswebapi.azurewebsites.net/api/Categoria/ObterGastosDoAno?ano=2023`,
          { headers }
        );

        const response2 = await fetch(
          `https://artemiswebapi.azurewebsites.net/api/Categoria/ObterGastosDoAno?ano=2023&tipo=2`,
          { headers }
        );

        const data = await response.json();

        const data2 = await response2.json();

        // Transformar os dados no formato esperado pelo Chart.js
        const chaves = Object.keys(data);
        const valores = Object.values(data);

        setArray([chaves, valores]);

        const chaves2 = Object.keys(data2);
        const valores2 = Object.values(data2);

        setArray2([chaves2, valores2]);

        // Opcionalmente, realizar outras ações aqui
        console.log(data);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };

    obterDados();
  }, []); // Array de dependências vazio para executar o efeito apenas uma vez no montamento do componente

  const lastUpdate = new Date().toLocaleDateString();

  return (
    <Col md="8">
      <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h5">Gastos por Mês em 2023</CardTitle>
          <p className="card-category">Gastos por Mês em 2023</p>
        </CardHeader>
        <CardBody>
          <Line
            data={{
              labels: array[0],
              datasets: [
                {
                  label : "Entradas",
                  data: array[1],
                  fill: false,
                  borderColor: "#3CD160",
                  backgroundColor: "transparent",
                  pointBorderColor: "#3CD160",
                  pointRadius: 0.5,
                  pointHoverRadius: 6,
                  pointBorderWidth: 8,
                },
                {
                  label: "Saidas",
                  data: array2[1],
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "transparent",
                  pointBorderColor: "red",
                  pointRadius: 0.5,
                  pointHoverRadius: 6,
                  pointBorderWidth: 8,
                },
              ],
            }}
            options={{
              plugins: {
                legend: { display: false },
              },
            }}
            width={400}
            height={100}
          />
        </CardBody>
        <CardFooter>
          <div className="chart-legend">
            <i className="fa fa-circle text-info" /> Gastos{" "}
          </div>
          <hr />
          <div className="card-stats">
            <p>
              <i className="fa fa-calendar" /> Última atualização: {lastUpdate}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default GastosAno;
