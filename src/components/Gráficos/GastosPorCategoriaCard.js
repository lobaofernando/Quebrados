import React from "react";
import { Card, CardHeader, CardBody, CardTitle, CardFooter } from "reactstrap";
import { Pie } from "react-chartjs-2";

function GastosPorCategoriaCard() {
    // Dados fictícios
    const mockData = [
        { nomeCategoria: "Alimentação", valor: 500 },
        { nomeCategoria: "Transporte", valor: 300 },
        { nomeCategoria: "Lazer", valor: 200 },
        { nomeCategoria: "Saúde", valor: 100 },
    ];

    // Array de cores
    const colors = ["#FF5733", "#FFC300", "#FF3333", "#A0A0A0", "#33FF57", "#3357FF", "#FF33F6", "#FF8C33"];

    const labels = mockData.map(item => item.nomeCategoria);
    const dataValues = mockData.map(item => item.valor);
    const backgroundColors = mockData.map((_, index) => colors[index % colors.length]);

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: backgroundColors,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "black",
            },
        },
    };

    // Data de última atualização (por exemplo, a data atual)
    const lastUpdate = new Date().toLocaleDateString();

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h5">Gastos por categoria</CardTitle>
                <p className="card-category">Últimos 30 dias</p>
            </CardHeader>
            <CardBody style={{ minHeight: "400px" }}>
                <div style={{ minHeight: "400px" }}>
                    <Pie data={data} options={options} />
                </div>
            </CardBody>
            <CardFooter>
                <div className="legend">
                    {mockData.map((item, index) => (
                        <span key={index}>
                            <i className="fa fa-circle" style={{ color: colors[index % colors.length] }} /> {item.nomeCategoria}{" "}
                        </span>
                    ))}
                </div>
                <hr />
                <div className="card-stats">
                    <p>
                        <i className="fa fa-calendar" /> Última atualização: {lastUpdate}
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}

export default GastosPorCategoriaCard;
