import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, CardFooter } from "reactstrap";
import { Line } from "react-chartjs-2";

function BalancoCard() {
    const [data, setData] = useState(null);
    const [lastUpdate, setLastUpdate] = useState("");
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    // Array de cores
    const colors = ["#FF5733", "#FFC300", "#FF3333", "#A0A0A0", "#33FF57", "#3357FF", "#FF33F6", "#FF8C33"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };

                const response = await fetch("https://artemiswebapi.azurewebsites.net/api/Categoria/ObterGastosTrintaDias", {
                    method: "POST",
                    headers: headers,
                });

                if (!response.ok) {
                    console.error("Erro na requisição", response);
                    return;
                }

                const responseData = await response.json();
                setData(responseData.map((item, index) => ({
                    x: item.nome,
                    y: item.valor,
                    nomeCategoria: item.nomeCategoria,
                    borderColor: colors[index % colors.length]
                })));
                if (responseData[0]?.data) {
                    const date = new Date(responseData[0].data);
                    setLastUpdate(date.toLocaleDateString());
                }
                setBalance(responseData.reduce((acc, item) => acc + item.valor, 0));
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar dados", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Carregando...</p>;

    const formattedBalance = balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <Card className="card-chart">
            <CardHeader>
                <CardTitle tag="h5">Balanço</CardTitle>
                <p className="card-category">Balanço de Entradas e saídas nos últimos 30 dias</p>
            </CardHeader>
            <CardBody style={{ minHeight: "400px" }}>
                <div style={{ minHeight: "400px" }}>
                    <Line
                        data={{
                            datasets: [
                                {
                                    data: data,
                                    borderColor: colors, // Definindo cores dinamicamente
                                    fill: false,
                                },
                            ],
                            labels: data.map(item => item.x),
                        }}
                        options={{
                            maintainAspectRatio: false,
                            title: {
                                display: false,
                            },
                            tooltips: {
                                callbacks: {
                                    label: function (tooltipItem, data) {
                                        const pointData = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                        return `${pointData.nomeCategoria}: R$ ${tooltipItem.yLabel}`;
                                    },
                                },
                            },
                        }}
                        width={400}
                        height={100}
                    />
                </div>
            </CardBody>
            <CardFooter>
                <div className="legend">
                    {data.map((item, index) => (
                        <span key={index}>
                            <i className="fa fa-circle" style={{ color: item.borderColor }} /> {item.nomeCategoria}{" "}
                        </span>
                    ))}
                </div>
                <hr />
                <div className="card-stats">
                    <p>
                        <i className="fa fa-calendar" /> Última atualização: {lastUpdate}
                    </p>
                    <p>
                        <i className="fa fa-money" /> Saldo atual: {formattedBalance}
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}

export default BalancoCard;
