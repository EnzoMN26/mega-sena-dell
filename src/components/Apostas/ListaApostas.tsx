import { useRecoilState } from "recoil";
import styles from "../../styles/ListaApostas.module.css";
import { usuariosState } from "../../resources/recoil";
import { Link } from "react-router-dom";

const Lista: React.FC = () => {
  const [usuarios, setUsuarios] = useRecoilState(usuariosState); //dados dos usuarios existentes
  return (
    <div id={styles.listaApostas}>
      {usuarios.some((usuario) => usuario.aposta.length > 0) ? (
        <div id={styles.divTabela}>
          <table>
            <thead>
              <tr>
                <td>Nome</td>
                <td>Cpf</td>
                <td>ID Aposta</td>
                <td>Aposta</td>
              </tr>
            </thead>
            <tbody id={styles.tableBody}>
              {usuarios.map((ganhador) => {
                return ganhador.aposta.map((aposta, index) => {
                  return (
                    <tr key={index}>
                      <td>{ganhador.nome}</td>
                      <td>{ganhador.cpf}</td>
                      <td>{aposta.id}</td>
                      <td>{aposta.numeros.map((numero) => `${numero} `)}</td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div id={styles.semApostas}>Não existem apostas no momento!</div>
      )}
      <div id={styles.footer}>
        <Link className={styles.link} to="/menu">
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default Lista;
