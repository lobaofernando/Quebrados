import React from "react";
import { Card, CardHeader, CardBody, CardTitle, CardFooter } from "reactstrap";
import { Line } from "react-chartjs-2";
import { dashboardNASDAQChart } from "variables/charts";

function BalancoCard() {
    return (
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
    );
}

export default BalancoCard;
