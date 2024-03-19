import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/Aposta.module.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { usuariosState, contadorIdAposta } from "../../resources/recoil";

//Componente responsavel por renderizar a tela onde eh realizada a aposta
const Aposta: React.FC = () => {
  const location = useLocation(); //inicializa objeto para recuperar os states passados ao componente
  const { id, nome, cpf } = location.state; //dados recebidos do componente de registro
  const [usuarios, setUsuarios] = useRecoilState(usuariosState); //dados dos usuarios existentes
  const [idAposta, setIdAposta] = useRecoilState(contadorIdAposta); //id global das apostas
  const [aposta, setAposta] = useState<number[]>([]); //aposta sendo preenchida atualmente

  //adiciona um numero na aposta atual, caso esse numero ja esteja escolhido ele é removido
  function adiciona(x: number): void {
    if (aposta.includes(x)) {
      setAposta(aposta.filter((e) => e != x));
    } else if (aposta.length < 5) {
      setAposta([...aposta, x]);
    }
  }

  //faz a atribuição da aposta à pessoa, caso a pessoa não esteja cadastrada também realiza o cadastro
  function confirmAposta() {
    if (aposta.length == 5) {
      var pessoaAux = usuarios.find((e) => e.id == id);
      //se o usuario existe apenas adiciona a aposta
      if (pessoaAux != undefined) {
        setUsuarios(
          usuarios.map((e) =>
            e.id == pessoaAux?.id
              ? {
                  ...e,
                  aposta: [...e.aposta, { id: idAposta, numeros: aposta }],
                }
              : e
          )
        );
      } else { //se o usuario nao existe ele realiza o cadastro ja adicionando a aposta
        setUsuarios([
          ...usuarios,
          {
            id: id,
            nome: nome,
            cpf: cpf,
            saldo: 0,
            aposta: [{ id: idAposta, numeros: aposta }],
            itens: [],
          },
        ]);
      }
      setIdAposta(idAposta + 1); //incrementa o id global das apostas
      setAposta([]); //reseta o state que guarda a aposta sendo selecionada
    }
  }

  //gera numeros aleatorios para completar a aposta (SURPRESINHA)
  function surpresinha() {
    var apostaTemp = aposta.map((e) => e);
    while (apostaTemp.length < 5) {
      const num = Math.floor(Math.random() * 50) + 1;
      if (!apostaTemp.includes(num)) {
        apostaTemp.push(num);
      }
    }
    setAposta(apostaTemp);
  }

  //realiza o cadastro da pessoa ao sair caso ela não faça nenhuma aposta
  const cadastraAoSair = () => {
    if (!usuarios.find((usuario) => usuario.id == id)) {
      setUsuarios([
        ...usuarios,
        {
          id: id,
          nome: nome,
          cpf: cpf,
          saldo: 0,
          aposta: [],
          itens: [],
        },
      ]);
    }
  };

  //renderiza a grade de botoes da seleção recursivamente
  const renderizaBotoes = (count: number): JSX.Element[] => {
    if (count <= 0) {
      return [];
    }

    return [
      ...renderizaBotoes(count - 1),
      <button className={styles.gridItem} key={count} onClick={() =>adiciona(count)}>{`${count}`}</button>,
    ];
  };

  return (
    <div id={styles.aposta}>
      <div className={styles.gridContainer}>
        {renderizaBotoes(50)}
      </div>
      <div id={styles.visor}>
        <div className={styles.escolhido}>
          {aposta.length > 0 ? aposta[0] : ""}
        </div>
        <div className={styles.escolhido}>
          {aposta.length > 1 ? aposta[1] : ""}
        </div>
        <div className={styles.escolhido}>
          {aposta.length > 2 ? aposta[2] : ""}
        </div>
        <div className={styles.escolhido}>
          {aposta.length > 3 ? aposta[3] : ""}
        </div>
        <div className={styles.escolhido}>
          {aposta.length > 4 ? aposta[4] : ""}
        </div>
      </div>
      <div id={styles.footer}>
        <Link onClick={cadastraAoSair} id={styles.voltar} to="/menu">
          Voltar
        </Link>
        <button onClick={() => surpresinha()} id={styles.surpresinha}>
          SURPRESINHA
        </button>
        <div id={styles.rightButtons}>
          <button onClick={() => confirmAposta()} className={styles.botao}>
            Confirmar Aposta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aposta;
