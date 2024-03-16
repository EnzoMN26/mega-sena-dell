import { Link } from "react-router-dom"
import styles from "../styles/Menu.module.css"

const Menu: React.FC = () => {
    return( 
        <div id={styles.menu}>
            <div id={styles.menuLinks}>
            <Link className={styles.link} to="registro">Fazer Aposta</Link>
            <Link className={styles.link} to="loja">Loja</Link>
            <Link className={styles.link} to="inventario">Inventário</Link>
            </div>
            <div id={styles.footer}>
                <Link className={styles.link} to="sorteio">Realizar Sorteio</Link>
            </div>
        </div>
    )
}

export default Menu;