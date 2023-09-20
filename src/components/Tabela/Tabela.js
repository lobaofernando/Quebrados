import React, { useState, useEffect } from 'react';
import GridItem from "components/GridItem/GridItem";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";

function Tabela() {
  const [itens, setItens] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onDelete = (ID) => {
    // Implemente a lógica de exclusão do item com o ID fornecido
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Substitua pelo seu token de autorização válido
        const headers = {
          mode: `no-cors`,
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          `https://artemiswebapi.azurewebsites.net/api/Categoria/ObterGastos?pagina=${currentPage}`,
          { headers }
        );
        const data = await response.json();
        setItens(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Descrição</th>
                      <th>Categoria</th>
                      <th className="text-center">Tipo</th>
                      <th className="text-center">Valor</th>
                      <th className="text-center">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itens?.map((item, index) => (
                      <GridItem key={index} item={item} />
                    ))}
                  </tbody>
                  <Button onClick={goToPreviousPage}>Anterior</Button>
                  <Button onClick={goToNextPage}>Próxima</Button>
                </Table>
              </CardBody>
            </Card>
          </Col>
    </>
  );
}

export default Tabela;
