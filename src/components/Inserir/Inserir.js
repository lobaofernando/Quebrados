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
  }, []);

  const [renderizarCadastro, setRenderizarCadastro] = useState(false);

  const handleClick = () => {
    setDescricao(null);
    setValor(null);
    if (renderizarCadastro) {
      setRenderizarCadastro(false);
    } else {
      setRenderizarCadastro(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (categoria == '' && props.tipo==2) {
      alert('Selecione uma categoria!');
      return;
    }
    
    if (valor==null || descricao==null) {
      alert('Preencha todos os dados!');
      return;
    }

    console.log(`decrição: ${descricao}`);
    console.log(`categoria: ${categoria}`);
    console.log(`valor: ${valor}`);
    console.log(`tipo: ${props.tipo}`);

    var dados = {
      nome: descricao,
      categoriaId: categoria,
      valor: parseFloat(valor),
      tipo: props.tipo,
    };

    if (categoria=="") {
      dados["categoriaId"] = null;
    }

    const token = localStorage.getItem("accessToken"); // Substitua pelo seu token de autorização válido
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json-patch+json',
        mode: `no-cors`,
        Authorization: `Bearer ${token}`,
      },
    };

    const url = 'https://artemiswebapi.azurewebsites.net/api/Categoria/InserirGasto';

    axios
      .post(url, dados, requestOptions)
      .then(() => {
        alert('Transação registrada!!');
        setRenderizarCadastro(false);
      })
      .catch((erro) => {
        alert(erro);
      });
  };

  return (
    <>
      {!renderizarCadastro && <Button onClick={handleClick}>+</Button>}
      
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
              disabled
            >
              <option value=""></option>
              {categorias?.map((item, index) => (
                  <option value={item.id}>{item.nome}</option>
                  ))}
            </select>
          </FormGroup>
        </Col>
        <Col>
          <Button onClick={handleSubmit}>Cadastrar</Button>
          <Button onClick={handleClick}>Cancelar</Button>
        </Col>
      </Row>}
    </>
  );
}

export default Inserir;
