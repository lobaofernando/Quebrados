import React, { useState } from 'react';
import axios from 'axios';
import './CadastroUsuario.css';


function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
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
          setEndereco(`${logradouro}, ${bairro}, ${localidade} - ${uf}`);

          setEnderecoClasse({
            logradouro,
            bairro,
            localidade,
            uf,
          });
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
    console.log(`Endereço: ${endereco}`);
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
      })
      .catch((erro) => {
        alert(erro);
      });
  };

  return (
    <div className="cadastro-usuario">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="name"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirme a sua senha</label>
          <input
            type="password"
            id="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={handleTelefoneChange}
            maxLength="15"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            value={cep}
            onChange={(e) => setCep(formatarCEP(e.target.value))}
            onBlur={handleCepChange}
            maxLength="9"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <textarea
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sexo">Sexo</label>
          <select
            id="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
          >
            <option value=""></option>
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroUsuario;
