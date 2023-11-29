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
import GastosAno from "components/Gráficos/GastosAno";
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
          <GastosAno></GastosAno>
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