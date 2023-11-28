import React, { useState } from "react";
import Tabela from "components/Tabela/Tabela.js";
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Row,
  Table,
} from "reactstrap";


// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import GastosPorCategoriaCard from "components/Gráficos/GastosPorCategoriaCard";
import BalancoCard from "components/Gráficos/BalançoEntradaSaida";
import Balanco from "components/Balanco/Balanco";

function Dashboard() {

  return (
    <>
      <div className="content">
        <Balanco></Balanco>
        <Row>
          <Col md="4">
            <GastosPorCategoriaCard></GastosPorCategoriaCard>
          </Col>
          <Col md="8">
            {/* <BalancoCard></BalancoCard> */}
            <Card className="card-chart">
            <CardHeader>
                <CardTitle tag="h5">Balanço</CardTitle>
                <p className="card-category">Balanço de Entradas e saídas nos últimos 30 dias</p>
            </CardHeader>
            <CardBody>
                <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                />
            </CardBody>
            <CardFooter>
                <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Balanço{" "}
                </div>
                <hr />
                <div className="card-stats">
                    <p>
                        <i className="fa fa-calendar" /> Última atualização: 10 de Setembro de 2023
                    </p>
                    <p>
                        <i className="fa fa-money" /> Saldo atual: R$ 5,000
                    </p>
                </div>
            </CardFooter>
        </Card>
          </Col>
        </Row>
        <Row>
          <Tabela tipo={1}/>
          <Tabela tipo={2}/>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;