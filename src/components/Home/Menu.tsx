import { Link } from "react-router-dom";
import styles from "../../styles/Menu.module.css";

const Menu: React.FC = () => {
  return (
    <div id={styles.menu}>
      <div id={styles.menuLinks}>
        <Link className={styles.link} to="/registro">
          Fazer Aposta
        </Link>
        <Link className={styles.link} to="/lista">
          Lista de Apostas
        </Link>
        <Link className={styles.link} to="/lojaLogin">
          Loja
        </Link>
        <Link className={styles.link} to="/inventarioLogin">
          Inventário
        </Link>
      </div>
      <div id={styles.footer}>
        <Link className={styles.link} to="/sorteio">
          Realizar Sorteio
        </Link>
      </div>
    </div>
  );
};

export default Menu;
