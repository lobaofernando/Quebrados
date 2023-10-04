import React from "react";
import { Card, CardHeader, CardBody, CardTitle, CardFooter } from "reactstrap";
import { Line } from "react-chartjs-2";

function BalancoCard() {
    // Dados fictícios
    const mockData = [
        { nome: "Dia 1", valor: 100, nomeCategoria: "Alimentação" },
        { nome: "Dia 2", valor: 200, nomeCategoria: "Transporte" },
        { nome: "Dia 3", valor: 150, nomeCategoria: "Lazer" },
        { nome: "Dia 4", valor: 250, nomeCategoria: "Saúde" },
    ];

    // Array de cores
    const colors = ["#FF5733", "#FFC300", "#FF3333", "#A0A0A0", "#33FF57", "#3357FF", "#FF33F6", "#FF8C33"];

    const formattedData = mockData.map((item, index) => ({
        x: item.nome,
        y: item.valor,
        nomeCategoria: item.nomeCategoria,
        borderColor: colors[index % colors.length]
    }));
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
                setData(responseData?.map((item, index) => ({
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

    const balance = 890; // Alterado para 890
    const formattedBalance = balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const lastUpdate = new Date().toLocaleDateString();

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
                                    data: formattedData,
                                    borderColor: colors, // Definindo cores dinamicamente
                                    fill: false,
                                },
                            ],
                            labels: data?.map(item => item.x),
                            labels: formattedData.map(item => item.x),
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
                    {formattedData.map((item, index) => (
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
