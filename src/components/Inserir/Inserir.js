import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

function Inserir(props) {
  const [categorias, setCategorias] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');

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
          `https://artemiswebapi.azurewebsites.net/api/Categoria/ObterCategorias`,
          { headers }
        );
        const data = await response.json();
        setCategorias(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  });

  const [renderizarCadastro, setRenderizarCadastro] = useState(false);

  const handleClick = () => {
    if (renderizarCadastro) {
      setRenderizarCadastro(false);
    } else {
      setRenderizarCadastro(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (categoria == '') {
      alert('Selecione uma categoria!');
      return;
    }
    console.log(`decrição: ${descricao}`);
    console.log(`categoria: ${categoria}`);
    console.log(`valor: ${valor}`);
    console.log(`tipo: ${props.tipo}`);

    const dados = {
      name: descricao,
      categoriaId: categoria,
      valor: valor,
      tipo: props.tipo,
    };

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    };

    const url = 'https://artemiswebapi.azurewebsites.net/api/Categoria/InserirGasto';

    axios
      .post(url, dados, requestOptions)
      .then(() => {
        alert('Transação registrada!!');
      })
      .catch((erro) => {
        alert(erro);
      });
  };

  return (
    <>
      <Button onClick={handleClick}>+</Button>
      {renderizarCadastro && 
      <Row>
          <Col className="pr-1" md="4">
            <FormGroup>
              <label>Descrição</label>
              <Input
                type="text"
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                maxLength="35"
                required
              />
            </FormGroup>
          </Col>
          <Col className="px-1" md="4">
            <FormGroup>
              <label>Valor</label>
              <Input
                placeholder="R$ 50,00"
                type="currency"
                id="valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col className="pl-1" md="4">
            <FormGroup>
              <label>Categoria</label>
              <select class="form-group form-control"
                id="categoria"
                placeholder='selecione'
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value=""></option>
                {categorias?.map((item, index) => (
                    <option value={item.id}>{item.nome}</option>
                    ))}
              </select>
            </FormGroup>
          </Col>
          <Button onClick={handleSubmit}>Cadastrar</Button>
      </Row>}
    </>
  );
}

export default Inserir;
