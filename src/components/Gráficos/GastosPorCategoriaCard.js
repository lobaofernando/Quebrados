import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, CardFooter } from "reactstrap";
import { Pie } from "react-chartjs-2";

function GastosPorCategoriaCard() {
    const [itens, setItens] = useState([]);
    const currentPage = 1;

    // Array de cores
    const colors = ["#FF5733", "#FFC300", "#FF3333", "#A0A0A0", "#33FF57", "#3357FF", "#FF33F6", "#FF8C33"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const headers = {
                    mode: "no-cors",
                    Authorization: `Bearer ${token}`,
                };

                const response = await fetch(
                    `https://artemiswebapi.azurewebsites.net/api/Categoria/ObterGastos?tipo=2&pagina=${currentPage}`,
                    { headers }
                );
                const data = await response.json();
                setItens(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [currentPage]);

    const labels = itens.map(item => item.nomeCategoria);
    const dataValues = itens.map(item => item.valor);
    const backgroundColors = itens.map((_, index) => colors[index % colors.length]); // Associa cada categoria a uma cor

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

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h5">Gastos por categoria</CardTitle>
                <p className="card-category">Últimos 30 dias</p>
            </CardHeader>
            <CardBody style={{ height: "380px" }}>
                <div style={{ height: "100%" }}>
                    <Pie data={data} options={options} />
                </div>
            </CardBody>
            <CardFooter>
                <div className="legend">
                    {itens.map((item, index) => (
                        <span key={index}>
                            <i className="fa fa-circle" style={{ color: colors[index % colors.length] }} /> {item.nomeCategoria}{" "}
                        </span>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}

export default GastosPorCategoriaCard;
