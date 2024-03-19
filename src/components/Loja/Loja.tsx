import { useRecoilState } from "recoil";
import styles from "../../styles/Loja.module.css";
import { Pessoa, usuariosState } from "../../resources/recoil";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


//Componente responsavel por renderizar a loja, onde é possivel comprar itens utilizando o saldo de cada Usuario.
const Loja: React.FC = () => {
  const location = useLocation(); //inicializa objeto para recuperar os states passados ao componente
  const { id } = location.state; //dados recebidos do componente de Login
  const [usuarios, setUsuarios] = useRecoilState(usuariosState); //dados dos usuarios existentes
  const [usuarioAtual, setUsuarioAtual] = useState<Pessoa>(); //dados dos usuario utilizando a loja
  const [aviso, setAviso] = useState(""); //dados dos usuarios existentes

  //Atribui o produto a pessoa. Caso ela ja possua o produto a função encontra este produto e aumenta sua quantidade.
  function compraPorduto(nome: string, valor: number) {
    //verifica se o usuario possui saldo suficiente
    if (usuarioAtual == undefined || usuarioAtual.saldo < valor) {
      setAviso("saldo insuficiente");
    } else { //atribui o produto ao usuario
      setUsuarios(
        usuarios.map((usuario) => {
          return usuario.id == id
            ? usuario.itens.some((item) => item.nome == nome)
              ? {
                  ...usuario,
                  saldo: usuario.saldo - valor,
                  itens: usuario.itens.map((item) =>
                    item.nome == nome
                      ? { nome: item.nome, quantidade: item.quantidade + 1 }
                      : item
                  ),
                }
              : {
                  ...usuario,
                  saldo: usuario.saldo - valor,
                  itens: [...usuario.itens, { nome: nome, quantidade: 1 }],
                }
            : usuario;
        })
      );
      //atualiza o state local que representa o usuario que esta utilizando a loja
      setUsuarioAtual({
        ...usuarioAtual,
        saldo: usuarioAtual.saldo - valor,
      });
      setAviso("");
    }
  }

  //Executa ao inciar o programa, salvando as informacoes do usuario atual em um state
  useEffect(() => {
    setUsuarioAtual(usuarios.find((usuario) => usuario.id == id));
  }, []);

  return (
    <div id={styles.loja}>
      <div id={styles.divTable}>
        <table>
          <thead>
            <tr>
              <td>Nome Produto</td>
              <td>Valor</td>
              <td></td>
            </tr>
          </thead>
          <tbody id={styles.tableBody}>
            <tr>
              <td>Chaveiro Dell</td>
              <td>50</td>
              <td>
                <button
                  onClick={() => compraPorduto("Chaveiro Dell", 50)}
                  className={styles.botao}
                >
                  COMPRAR
                </button>
              </td>
            </tr>
            <tr>
              <td>Caneta Dell</td>
              <td>30</td>
              <td>
                <button
                  onClick={() => compraPorduto("Caneta Dell", 30)}
                  className={styles.botao}
                >
                  COMPRAR
                </button>
              </td>
            </tr>
            <tr>
              <td>Colher de Madeira</td>
              <td>100</td>
              <td>
                <button
                  onClick={() => compraPorduto("Colher de Madeira", 100)}
                  className={styles.botao}
                >
                  COMPRAR
                </button>
              </td>
            </tr>
            <tr>
              <td>Beyblade de Metal</td>
              <td>500</td>
              <td>
                <button
                  onClick={() => compraPorduto("Beyblade de Metal", 500)}
                  className={styles.botao}
                >
                  COMPRAR
                </button>
              </td>
            </tr>
            <tr>
              <td>Playstation 5</td>
              <td>1000</td>
              <td>
                <button
                  onClick={() => compraPorduto("Playstation 5", 1000)}
                  className={styles.botao}
                >
                  COMPRAR
                </button>
              </td>
            </tr>
            <tr>
              <td>Vaga na Dell</td>
              <td>9999</td>
              <td>
                <button
                  onClick={() => compraPorduto("Vaga na Dell", 9999)}
                  className={styles.botao}
                >
                  COMPRAR
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id={styles.footer}>
        <Link className={styles.link} to="/menu">
          Voltar
        </Link>
        <div id={styles.aviso}>{aviso}</div>
        <div id={styles.saldo}>Saldo: {usuarioAtual?.saldo}</div>
      </div>
    </div>
  );
};

export default Loja;
