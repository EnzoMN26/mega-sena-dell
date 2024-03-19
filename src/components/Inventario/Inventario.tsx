import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/Inventario.module.css";
import { useRecoilState } from "recoil";
import { Pessoa, usuariosState } from "../../resources/recoil";
import { useEffect, useState } from "react";

const Inventario: React.FC = () => {
  const location = useLocation();
  const { id } = location.state; //dados recebidos do componente de Login
  const [usuarios, setUsuarios] = useRecoilState(usuariosState); //dados dos usuarios existentes
  const [usuarioAtual, setUsuarioAtual] = useState<Pessoa>(); //dados dos usuarios existentes

  useEffect(() => {
    setUsuarioAtual(usuarios.find((usuario) => usuario.id == id));
  }, []);

  return (
    <div id={styles.inventario}>
      {usuarioAtual?.itens.length ? (
        <div id={styles.divTabela}>
          <table>
            <thead>
              <tr>
                <td>Item</td>
                <td>Quantidade</td>
              </tr>
            </thead>
            <tbody id={styles.tableBody}>
              {usuarioAtual?.itens.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.nome}</td>
                    <td>{item.quantidade}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div id={styles.semItens}>Inventário Vazio!</div>
      )}
      <div id={styles.footer}>
        <Link className={styles.link} to="/">
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default Inventario;
