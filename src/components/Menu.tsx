import { Link } from "react-router-dom"
import styles from "../styles/Menu.module.css"

const Menu: React.FC = () => {
    return( 
        <div id={styles.menu}>
            <div id={styles.menuLinks}>
            <Link to="registro">Fazer Aposta</Link>
            <Link to="loja">Loja</Link>
            <Link to="inventario">Inventário</Link>
            </div>
            <div id={styles.footer}>
                <Link to="sorteio">Realizar Sorteio</Link>
            </div>
        </div>
    )
}

export default Menu;