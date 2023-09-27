import React, { useState, useEffect } from 'react';
import GridItem from "components/GridItem/GridItem";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Row,
  Table,
} from "reactstrap";
import Inserir from 'components/Inserir/Inserir';

function Tabela(props) {
  const [itens, setItens] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Substitua pelo seu token de autorização válido
        const headers = {
          mode: `no-cors`,
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          `https://artemiswebapi.azurewebsites.net/api/Categoria/ObterGastos?tipo=${props.tipo}&pagina=${currentPage}`,
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
            {props.tipo==1 ? <CardTitle tag="h4">Entradas</CardTitle> : <CardTitle tag="h4">Saídas</CardTitle>}
            <Inserir tipo={props.tipo}/>
            </CardHeader>
            <CardBody>
              <div style={{minHeight:"400px"}}>
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
              </Table>
              </div>
                <div>
                  <Button onClick={goToPreviousPage}>Anterior</Button>
                  <Button onClick={goToNextPage}>Próxima</Button>
                </div>
            </CardBody>
          </Card>
        </Col>
    </>
  );
}

export default Tabela;
