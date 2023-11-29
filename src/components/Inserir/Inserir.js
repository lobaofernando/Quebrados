import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';
import { Button, Col, Container, FormGroup, Input, Row } from 'reactstrap';

function Inserir(props) {
  const [categorias, setCategorias] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');

  const onDelete = (ID) => {
    // Implemente a lógica de exclusão do item com o ID fornecido
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          'https://artemiswebapi.azurewebsites.net/api/Categoria/ObterCategorias',
          { headers }
        );
        const data = await response.json();
        setCategorias(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [renderizarCadastro, setRenderizarCadastro] = useState(false);

  const handleClick = () => {
    setDescricao('');
    setValor('');
    setCategoria('');
    setData('');
    if (renderizarCadastro) {
      setRenderizarCadastro(false);
    } else {
      setRenderizarCadastro(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!valor || !descricao || !data) {
      alert('Preencha todos os dados!');
      return;
    }

    const dados = {
      nome: descricao,
      categoriaId: categoria || null,
      valor: valor, // Convertendo a moeda para número
      tipo: props.tipo,
      dataDoGasto: new Date(data).toISOString(),
    };

    const token = localStorage.getItem('accessToken');
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url =
      'https://artemiswebapi.azurewebsites.net/api/Categoria/InserirGasto';

    axios
      .post(url, dados, requestOptions)
      .then(() => {
        alert('Transação registrada!!');
        setRenderizarCadastro(false);
        window.location.reload();
      })
      .catch((erro) => {
        alert(erro);
      });
  };

  return (
    <>
      {!renderizarCadastro && <Button onClick={handleClick}>+</Button>}

      {renderizarCadastro && (
        <Container>
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
                <CurrencyInput
                  prefix="R$ "
                  decimalSeparator=","
                  groupSeparator="."
                  allowNegativeValue={false}
                  decimalsLimit={2}
                  placeholder="R$ 50,00"
                  value={valor}
                  onValueChange={(value) => setValor(value)}
                  required
                  style={{
                    fontFamily: "Montserrat, Helvetica Neue, Arial, sans-serif",
                    display: "block",
                    width: "100%",
                    fontWeight: 400,
                    backgroundClip: "padding-box",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #DDDDDD",
                    borderRadius: "4px",
                    color: "#66615b",
                    lineHeight: "normal",
                    fontSize: "14px",
                    transition: "color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out",
                    boxShadow: "none",
                    height: "initial",
                    padding: "10px",
                  }}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="4">
              <FormGroup>
                <label>Data</label>
                <Input
                  type="date"
                  id="data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex align-items-end">
            <Col className="pr-1" md="4">
              <FormGroup>
                <label>Categoria</label>
                <select
                  className="form-group form-control"
                  id="categoria"
                  placeholder="selecione"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value=""></option>
                  {categorias?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
            <Col className="px-1" md="8">
              <Button onClick={handleSubmit}>Cadastrar</Button>
              <Button onClick={handleClick}>Cancelar</Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Inserir;
