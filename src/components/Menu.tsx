import { Link } from "react-router-dom"
import styles from "../styles/Menu.module.css"

const Menu: React.FC = () => {
    return( 
        <div id={styles.menu}>
            <Link to="registro">Fazer Aposta</Link>
            <Link to="loja">Loja</Link>
            <Link to="inventario">Inventário</Link>
            <div id={styles.footer}>
                <Link to="sorteio">Realizar Sorteio</Link>
            </div>
        </div>
    )
}

export default Menu;