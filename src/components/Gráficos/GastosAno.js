import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
} from "reactstrap";

const GastosAno = () => {

    const [gastos, setGastos] = useState([]);
    const [array, setArray] = useState(0);


    const obterGastosAno = async () => {
            try {
            const token = localStorage.getItem('accessToken');
            const headers = {
                mode: 'no-cors',
                Authorization: `Bearer ${token}`,
            };
        
            const response = await fetch(
                `https://artemiswebapi.azurewebsites.net/api/Categoria/ObterGastosDoAno?ano=2023`,
                { headers }
            );
            const data = await response.json();
            setGastos(data);
            console.log(data);
            } catch (error) {
            console.log(error);
            }
        };

    const criarArray = (gastos) => {
        const chaves = Object.keys(gastos);
        const valores = Object.values(gastos);

        setArray([chaves, valores]);
    }

    const arrayAno = {
        data: (canvas) => {
          return {
            labels: [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro"      
              ],
            datasets: [
              {
                data: array[1],
                fill: false,
                borderColor: "#3CD160",
                backgroundColor: "transparent",
                pointBorderColor: "#3CD160",
                pointRadius: 0.5,
                pointHoverRadius: 6,
                pointBorderWidth: 8,
              },
            ],
          };
        },
        options: {
          plugins: {
            legend: { display: false },
          },
        },
      };
    
      useEffect(() => {
        const obterDados = async () => {
          await obterGastosAno();
          criarArray(gastos);
        };
      
        obterDados();
      }, [gastos]);
      

    const lastUpdate = new Date().toLocaleDateString();

    
    return (
        <Col md="8">
        {/* <BalancoCard></BalancoCard> */}
        <Card className="card-chart">
          <CardHeader>
              <CardTitle tag="h5">Gastos por Mês em 2023</CardTitle>
              <p className="card-category">Gastos por Mês em 2023</p>
          </CardHeader>
          <CardBody>
            <Line
                data={arrayAno.data}
                options={arrayAno.options}
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
}

export default GastosAno;
