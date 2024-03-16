import { Link } from "react-router-dom";
import styles from "../styles/Registro.module.css"

const Registro: React.FC = () => {
    return (
        <div id={styles.registro}>
            <div id={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="cpf">CPF:</label>
                    <input type="text" id="cpf" className={styles.input} />
                </div>
            </div>
            <div id={styles.footer}>
                <Link className={styles.botao} to="/">Voltar</Link>
                <Link className={styles.botao} to="/aposta">Confirmar</Link>
            </div>
        </div>
    )
}

export default Registro;