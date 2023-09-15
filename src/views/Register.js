import React, { useState } from 'react';
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  FormGroup,
  Form,
  Input,
  Row
} from "reactstrap";

function Register() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [enderecoClasse, setEnderecoClasse] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
  });

  const formatarCEP = (cep) => {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
    return cep;
  };

  const handleCepChange = (event) => {
    const cep = event.target.value;

    if (cep.length === 9) {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const { logradouro, bairro, localidade, uf } = response.data;
          if (response.data.erro) {
            setEnderecoClasse({
              logradouro:null,
              bairro:null,
              localidade:null,
              uf:null,
            });
            document.getElementById('logradouro').value = '';
            document.getElementById('bairro').value = '';
            document.getElementById('localidade').value = '';
            document.getElementById('uf').value = '';
            console.log(enderecoClasse);
            alert('CEP Inválido!!');
          } else {
            setEnderecoClasse({
              logradouro,
              bairro,
              localidade,
              uf,
            });
          }
          console.log(enderecoClasse);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  const formatarTelefone = (telefone) => {
    let telFormatado = telefone.replace(/\D/g, '');
    const regex = /^(\d{2})(\d{5})(\d+)/g;
    telFormatado = telFormatado.replace(regex, '($1) $2-$3');
    return telFormatado;
  };

  const handleTelefoneChange = (event) => {
    const telefone = event.target.value;
    setTelefone(formatarTelefone(telefone));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (senha !== confirmarSenha) {
      alert('As senhas não correspondem!');
      return;
    }
    console.log(`Nome: ${nome}`);
    console.log(`E-mail: ${email}`);
    console.log(`Telefone: ${telefone}`);
    console.log(`Endereço: `);
    console.log(enderecoClasse);
    console.log(`Data de Nascimento: ${dataNascimento}`);
    console.log(`Sexo: ${sexo}`);
    console.log(`Senha: ${senha}`);

    const dataNascimentoFormatada = new Date(dataNascimento).toISOString();
    const dados = {
      name: nome,
      email: email,
      password: senha,
      pessoa: {
        nome: nome,
        telefone: parseInt(telefone.replace(/[\s()-]/g, '')),
        endereco: {
          cep: parseInt(cep.replace(/[\s-]/g, '')),
          logradouro: enderecoClasse.logradouro,
          bairro: enderecoClasse.bairro,
          localidade: enderecoClasse.localidade,
          uf: enderecoClasse.uf,
        },
        dataDeNascimento: dataNascimentoFormatada,
        sexo: sexo == "M" ? 1 : 2
      },
    };



    const requestOptions = {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    };

    const url = 'https://artemiswebapi.azurewebsites.net/api/Usuario/v1/register';

    axios
      .post(url, dados, requestOptions)
      .then(() => {
        alert('Usuário Cadastrado!!');
        window.location.href = '/admin/login';
      })
      .catch((erro) => {
        alert(erro);
      });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Cadastrar Usuário</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Nome</label>
                        <Input
                          placeholder="Company"
                          type="name"
                          id="nome"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>E-mail</label>
                        <Input
                          placeholder="email"
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Senha</label>
                        <Input
                          placeholder="********"
                          type="password"
                          id="senha"
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Confirmar Senha</label>
                        <Input
                          placeholder="********"
                          type="password"
                          id="senha"
                          value={confirmarSenha}
                          onChange={(e) => setConfirmarSenha(e.target.value)}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col md="4">
                    <FormGroup>
                        <label>CEP</label>
                        <Input 
                          placeholder="49000-000"
                          type="text"
                          id="cep"
                          value={cep}
                          onChange={(e) => setCep(formatarCEP(e.target.value))}
                          onBlur={handleCepChange}
                          maxLength="9"
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="8">
                      <FormGroup>
                        <label>Logradouro</label>
                        <Input
                          placeholder="Rua A"
                          id="logradouro"
                          value={enderecoClasse.logradouro}
                          required
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Bairro</label>
                        <Input
                          placeholder="Farolândia"
                          id="bairro"
                          value={enderecoClasse.bairro}
                          required
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Localidade</label>
                        <Input
                          placeholder="Aracaju"
                          id="localidade"
                          value={enderecoClasse.localidade}
                          required
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                      <label>UF</label>
                      <Input
                          placeholder="SE"
                          id="uf"
                          value={enderecoClasse.uf}
                          required
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Telefone</label>
                        <Input
                          placeholder="(79) 99999-9999"
                          type="tel"
                          id="telefone"
                          value={telefone}
                          onChange={handleTelefoneChange}
                          maxLength="15"
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Data de Nascimento</label>
                        <Input
                          placeholder="01/01/2023"
                          type="date"
                          id="dataNascimento"
                          value={dataNascimento}
                          onChange={(e) => setDataNascimento(e.target.value)}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Sexo</label>
                        <select class="form-group form-control"
                          id="sexo"
                          placeholder='selecione'
                          value={sexo}
                          onChange={(e) => setSexo(e.target.value)}
                          required
                        >
                          <option value=""></option>
                          <option value="F">Feminino</option>
                          <option value="M">Masculino</option>
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Cadastrar
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Register;
