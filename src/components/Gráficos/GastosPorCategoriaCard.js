import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, CardFooter } from "reactstrap";
import { Pie } from "react-chartjs-2";

function GastosPorCategoriaCard() {
    const [itens, setItens] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const currentPage = 1; // Defina o valor correto para currentPage

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken"); // Substitua pelo seu token de autorização válido
                const headers = {
                    mode: "no-cors",
                    Authorization: `Bearer ${token}`,
                };

                const response = await fetch(
                    `https://artemiswebapi.azurewebsites.net/api/Categoria/ObterGastos?pagina=${currentPage}`,
                    { headers }
                );
                const data = await response.json();
                setItens(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [currentPage]); // Certifique-se de incluir currentPage como uma dependência

    const data = {
        labels: ["Comida", "Aluguel", "Lazer", "Educação"], // Rótulos para as fatias do gráfico
        datasets: [
            {
                data: [30, 40, 20, 10], // Valores correspondentes às fatias do gráfico
                backgroundColor: ["#FF5733", "#FFC300", "#FF3333", "#A0A0A0"], // Cores para cada fatia
            },
        ],
    };

    const options = {
        maintainAspectRatio: false, // Define se o gráfico deve manter a proporção
        responsive: true, // Torna o gráfico responsivo
        legend: {
            display: true, // Exibe a legenda
            position: "bottom", // Posição da legenda (top, bottom, left, right)
            labels: {
                fontColor: "black", // Cor do texto da legenda
            },
        },
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h5">Gastos por categoria</CardTitle>
                <p className="card-category">Últimos 30 dias</p>
            </CardHeader>
            <CardBody style={{ height: "380px" }}> {/* Ajuste a altura aqui */}
                <div style={{ height: "100%" }}> {/* Ajuste a altura do contêiner do gráfico */}
                    <Pie data={data} options={options} />
                </div>
            </CardBody>
            <CardFooter>
                <div className="legend">
                    <i className="fa fa-circle text-primary" /> Comida{" "}
                    <i className="fa fa-circle text-warning" /> Aluguel{" "}
                    <i className="fa fa-circle text-danger" /> Lazer{" "}
                    <i className="fa fa-circle text-gray" /> Educação{" "}
                </div>
            </CardFooter>
        </Card>
    );
}

export default GastosPorCategoriaCard;
