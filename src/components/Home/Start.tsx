import { Link } from "react-router-dom";
import styles from "../../styles/Start.module.css";

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
