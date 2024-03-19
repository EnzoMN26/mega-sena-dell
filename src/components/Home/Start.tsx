import { Link } from "react-router-dom";
import styles from "../../styles/Start.module.css";

//Componente responsavel por renderizar a tela com o botao que da inicio a aplicacao
const Start: React.FC = () => {
  return (
    <div id={styles.start}>
        <Link className={styles.link} to="/menu">
          Iniciar
        </Link>
    </div>
  );
};

export default Start;
