import { Link } from "react-router-dom";
import styles from "../../styles/Sorteio.module.css";
import { useRecoilState } from "recoil";
import { Aposta, Pessoa, usuariosState } from "../../resources/recoil";
import { useRef, useState } from "react";

//Componente responsavel por renderizar a tela onde o sorteio é realizado e tambem o resultado do sorteio
const Sorteio: React.FC = () => {
  const [usuarios, setUsuarios] = useRecoilState(usuariosState); //dados dos usuarios existentes
  const [loader, setLoader] = useState(false); //boolean para controlar o aparecimento do loader. (que serve apenas como um toque visual)
  const [iniciar, setIniciar] = useState(true); //boolean para controlar o aparecimento do botao de iniciar sorteio.
  const [numGanhador, setNumGanhador] = useState<number[]>([]); //resultado do sorteio
  const [ganhadores, setGanhadores] = useState<Pessoa[]>([]); //guarda os ganhadores do sorteio, ja com apenas as apostas vencedoras filtradas
  const qntNumApostados = useRef<number[]>(Array(50).fill(0)); //array de 50 numeros, inicializado em 0, para armazenar as quantidade que cada um é apostado. O indice + 1 no array representa o numero.

  //compara dois arrays, vendo se o primeiro possui pelo menos 5 elementos iguais ao segundo
  function comparaApostas(a: number[], b: number[]): boolean {
    var count: number = 0;
    b.forEach((element) => {
      a.includes(element) ? count++ : null;
    });
    return count == 5 ? true : false;
  }

  //organiza o array de numeros apostados através de seus indices, onde cada indice somado uma unidade (+ 1) representa o numero apostado.
  // [2, 7, 1, 0] -> o numero 1 foi escolhido 2 vezes, o numero 2 foi escolhido 7 vezes...
  function organizaNumApostados(numeros: number[]) {
    return numeros
      .map((e, index) => ({ numero: index + 1, quant: e }))
      .sort((a, b) => {
        return b.quant - a.quant;
      })
      .filter((e) => e.quant > 0);
  }

  //zera as apostas dos usuario e soma a recompensa (1000 dividio entre os ganhadores) ao saldo dos ganhadores
  const finalizaSorteio = () => {
    const recompensa = 1000 / ganhadores.length;

    setUsuarios(
      usuarios.map((usuario) => {
        return ganhadores.some((ganhador) => ganhador.id == usuario.id)
          ? { ...usuario, aposta: [], saldo: usuario.saldo + recompensa }
          : { ...usuario, aposta: [] };
      })
    );
  };

  //funcao de ordenacao por ordem alfabetica, eh chamada pela funcao sort e utilizado como comparador dos elementos do array
  function ordemAlfabetica(a: Pessoa, b: Pessoa): number {
    if (a.nome < b.nome) {
      return -1;
    }
    if (a.nome > b.nome) {
      return 1;
    }
    return 0;
  }

  //executa o processo do sorteio
  function realizarSorteio() {
    setLoader(true); //liga o elemento que representa o o loading do sorteio

    var ganhadoresAux: Pessoa[] = []; //array temporario para armazenar os ganhadores do sorteio
    var numGanhadorTemp: number[] = []; //array temporario para armazenar os numeros vencedores que estao sendo sorteados

    //sorteia 4 numeros antes de entrar no while responsavel por realizar o sorteio 26 vezes. (ou seja, sorteia os 5 primeiros e mais 25 caso necessário)
    while (numGanhadorTemp.length < 4) {
      const num = Math.floor(Math.random() * 50) + 1;
      if (!numGanhadorTemp.includes(num)) {
        numGanhadorTemp.push(num);
      }
    }

    var counter: number = 0;

    //realiza o sorteio dos numeros enquanto confere os vencedores, acaba depois de 25 tentativas ou depois de encontrar pelo menos um vencedor
    while (ganhadoresAux.length < 1 && counter <= 25) {
      var num = 0;

      //sorteia um numero aleatorio até encontrar um que ainda nao tenha sido sorteado
      do {
        num = Math.floor(Math.random() * 50) + 1;
      } while (numGanhadorTemp.includes(num));

      numGanhadorTemp.push(num); //adiciona o numero sorteado aos numeros vencedores

      setNumGanhador(numGanhadorTemp);

      //tenta encontrar alguem que tenha acertado pelo menos 5 numeros em suas apostas
      usuarios.forEach((user) => {
        var apostas: Aposta[] = user.aposta.filter((aposta) =>
          comparaApostas(aposta.numeros, numGanhadorTemp)
        );
        if (apostas.length > 0) {
          ganhadoresAux.push({
            id: user.id,
            nome: user.nome,
            cpf: user.cpf,
            aposta: apostas,
            saldo: user.saldo,
            itens: [],
          });
        }
      });
      setGanhadores(ganhadoresAux);
      counter++;
    }

    //faz a contagem dos numeros apostados e suas quantidades totais
    usuarios.forEach((usuario) => {
      usuario.aposta.map((aposta) => {
        aposta.numeros.forEach(
          (num) =>
            (qntNumApostados.current[num - 1] =
              qntNumApostados.current[num - 1] + 1)
        );
      });
    });

    //desliga o simbolo de carregando depois de 1 segundo (timeout utilizado apenas por aparencia, deve ser retirado em uma aplicacao em producao)
    setTimeout(() => {
      setIniciar(false);
    }, 1000);
  }

  return (
    <div id={styles.sorteio}>
      {iniciar ? ( //alterna a tela ao iniciar o sorteio
        loader ? (
          <>
            <div id={styles.sorteando}>Sorteando</div>
            <div id={styles.loader}></div>
          </>
        ) : (
          <>
            {/*apresenta a tela inicial com o botao de iniciar o sorteio*/}
            <div id={styles.divIniciar}>
              <button
                className={styles.botao}
                onClick={() => realizarSorteio()}
              >
                Iniciar Sorteio
              </button>
            </div>
            <div id={styles.footerInicial}>
              <Link className={styles.link} to="/menu">
                Voltar
              </Link>
            </div>
          </>
        )
      ) : (
        <div id={styles.resultado}>
          <div id={styles.resultadoHeader}>
            <div>Numeros sorteados</div>
            <div>
              {
                //apresenta os numeros sorteados
                numGanhador.map((e, index) => (
                  <span key={index} className={styles.numResultado}>
                    {e}{" "}
                  </span>
                ))
              }
            </div>
          </div>
          <div id={styles.infos}>
            {/*apresenta a quantidade de rodadas realizadas e apostas vencedoras*/}
            <div>Rodadas Realizadas: {numGanhador.length - 4}</div>
            <div>
              Apostas Vencedoras:{" "}
              {ganhadores.reduce(
                (soma, pessoa) => soma + pessoa.aposta.length,
                0
              )}
            </div>
          </div>
          {/*apresenta a tabela de ganhadores*/}
          {ganhadores.length > 0 ? (
            <div>
              <div>Ganhadores</div>
              <div id={styles.divTable}>
                <table id={styles.table}>
                  <thead>
                    <tr>
                      <td>Nome</td>
                      <td>Cpf</td>
                      <td>ID Aposta</td>
                      <td>Aposta</td>
                    </tr>
                  </thead>
                  <tbody id={styles.tableBody}>
                    {/*mapeia e apresenta as apostas vencedoras*/}
                    {ganhadores.sort(ordemAlfabetica).map((ganhador) => {
                      return ganhador.aposta.map((aposta, index) => {
                        return (
                          <tr key={index}>
                            <td>{ganhador.nome}</td>
                            <td>{ganhador.cpf}</td>
                            <td>{aposta.id}</td>
                            <td>
                              {aposta.numeros.map((numero) => `${numero} `)}
                            </td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>Não há Ganhadores</div>
          )}
          <div id={styles.footer}>
            <div id={styles.numerosApostados}>
              {usuarios.some((usuarios) =>
                usuarios.aposta.some((aposta) => aposta.numeros.length > 0)
              ) ? (
                <>
                  {/*apresenta os numeros apostados e suas quantidades*/}
                  <div>Número Apostado:Quantidade de Apostas</div>
                  <div id={styles.listaApostados}>
                    {organizaNumApostados(qntNumApostados.current).map(
                      (e, index) => (
                        <div key={index}>{`${e.numero}:${e.quant}`}</div>
                      )
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <Link onClick={finalizaSorteio} className={styles.link} to="/menu">
              Confirmar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sorteio;
