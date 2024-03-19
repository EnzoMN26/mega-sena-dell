import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Aposta.module.css";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { usuariosState, contadorIdAposta } from "../resources/recoil";

const Aposta: React.FC = (props: any) => {
  const location = useLocation();
  const { id, nome, cpf } = location.state; //dados recebidos do componente de registro
  const [usuarios, setUsuarios] = useRecoilState(usuariosState); //dados dos usuarios existentes
  const [idAposta, setIdAposta] = useRecoilState(contadorIdAposta); //id global das apostas
  const [aposta, setAposta] = useState<number[]>([]); //aposta sendo executada

  //adiciona um numero na aposta atual, caso esse numero ja esteja ele é removido
  function adiciona(x: number): void {
    if (aposta.includes(x)) {
      setAposta(aposta.filter((e) => e != x));
    } else if (aposta.length < 5) {
      setAposta([...aposta, x]);
    }
  }

  //faz a atribuição da aposta à pessoa
  function confirmAposta() {
    if (aposta.length == 5) {
      var pessoaAux = usuarios.find((e) => e.id == id);
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
      } else {
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
      setIdAposta(idAposta + 1);
      setAposta([]);
    }
  }

  //gera os numeros aleatorios para completar a aposta
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

  return (
    <div id={styles.aposta}>
      <div className={styles.gridContainer}>
        <button onClick={() => adiciona(1)} className={styles.gridItem}>
          1
        </button>
        <button onClick={() => adiciona(2)} className={styles.gridItem}>
          2
        </button>
        <button onClick={() => adiciona(3)} className={styles.gridItem}>
          3
        </button>
        <button onClick={() => adiciona(4)} className={styles.gridItem}>
          4
        </button>
        <button onClick={() => adiciona(5)} className={styles.gridItem}>
          5
        </button>
        <button onClick={() => adiciona(6)} className={styles.gridItem}>
          6
        </button>
        <button onClick={() => adiciona(7)} className={styles.gridItem}>
          7
        </button>
        <button onClick={() => adiciona(8)} className={styles.gridItem}>
          8
        </button>
        <button onClick={() => adiciona(9)} className={styles.gridItem}>
          9
        </button>
        <button onClick={() => adiciona(10)} className={styles.gridItem}>
          10
        </button>
        <button onClick={() => adiciona(11)} className={styles.gridItem}>
          11
        </button>
        <button onClick={() => adiciona(12)} className={styles.gridItem}>
          12
        </button>
        <button onClick={() => adiciona(13)} className={styles.gridItem}>
          13
        </button>
        <button onClick={() => adiciona(14)} className={styles.gridItem}>
          14
        </button>
        <button onClick={() => adiciona(15)} className={styles.gridItem}>
          15
        </button>
        <button onClick={() => adiciona(16)} className={styles.gridItem}>
          16
        </button>
        <button onClick={() => adiciona(17)} className={styles.gridItem}>
          17
        </button>
        <button onClick={() => adiciona(18)} className={styles.gridItem}>
          18
        </button>
        <button onClick={() => adiciona(19)} className={styles.gridItem}>
          19
        </button>
        <button onClick={() => adiciona(20)} className={styles.gridItem}>
          20
        </button>
        <button onClick={() => adiciona(21)} className={styles.gridItem}>
          21
        </button>
        <button onClick={() => adiciona(22)} className={styles.gridItem}>
          22
        </button>
        <button onClick={() => adiciona(23)} className={styles.gridItem}>
          23
        </button>
        <button onClick={() => adiciona(24)} className={styles.gridItem}>
          24
        </button>
        <button onClick={() => adiciona(25)} className={styles.gridItem}>
          25
        </button>
        <button onClick={() => adiciona(26)} className={styles.gridItem}>
          26
        </button>
        <button onClick={() => adiciona(27)} className={styles.gridItem}>
          27
        </button>
        <button onClick={() => adiciona(28)} className={styles.gridItem}>
          28
        </button>
        <button onClick={() => adiciona(29)} className={styles.gridItem}>
          29
        </button>
        <button onClick={() => adiciona(30)} className={styles.gridItem}>
          30
        </button>
        <button onClick={() => adiciona(31)} className={styles.gridItem}>
          31
        </button>
        <button onClick={() => adiciona(32)} className={styles.gridItem}>
          32
        </button>
        <button onClick={() => adiciona(33)} className={styles.gridItem}>
          33
        </button>
        <button onClick={() => adiciona(34)} className={styles.gridItem}>
          34
        </button>
        <button onClick={() => adiciona(35)} className={styles.gridItem}>
          35
        </button>
        <button onClick={() => adiciona(36)} className={styles.gridItem}>
          36
        </button>
        <button onClick={() => adiciona(37)} className={styles.gridItem}>
          37
        </button>
        <button onClick={() => adiciona(38)} className={styles.gridItem}>
          38
        </button>
        <button onClick={() => adiciona(39)} className={styles.gridItem}>
          39
        </button>
        <button onClick={() => adiciona(40)} className={styles.gridItem}>
          40
        </button>
        <button onClick={() => adiciona(41)} className={styles.gridItem}>
          41
        </button>
        <button onClick={() => adiciona(42)} className={styles.gridItem}>
          42
        </button>
        <button onClick={() => adiciona(43)} className={styles.gridItem}>
          43
        </button>
        <button onClick={() => adiciona(44)} className={styles.gridItem}>
          44
        </button>
        <button onClick={() => adiciona(45)} className={styles.gridItem}>
          45
        </button>
        <button onClick={() => adiciona(46)} className={styles.gridItem}>
          46
        </button>
        <button onClick={() => adiciona(47)} className={styles.gridItem}>
          47
        </button>
        <button onClick={() => adiciona(48)} className={styles.gridItem}>
          48
        </button>
        <button onClick={() => adiciona(49)} className={styles.gridItem}>
          49
        </button>
        <button onClick={() => adiciona(50)} className={styles.gridItem}>
          50
        </button>
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
        <Link id={styles.voltar} to="/">
          Voltar
        </Link>
        <button onClick={() => surpresinha()} id={styles.surpresinha}>
          SURPRESINHA
        </button>
        <div id={styles.rightButtons}>
          <button onClick={() => confirmAposta()} className={styles.botao}>
            Confirmar Aposta
          </button>
          {aposta.length == 5 ? (
            <Link
              onClick={() => confirmAposta()}
              className={styles.botao}
              to="/"
            >
              Confirmar e Voltar
            </Link>
          ) : (
            <button className={styles.botao}>Confirmar e Voltar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Aposta;
