import { useRecoilState } from "recoil";
import styles from "../styles/Loja.module.css"
import { usuariosState } from "../resources/recoil";
import { Link } from "react-router-dom";

const Loja: React.FC = () => {
    const [usuarios, setUsuarios] = useRecoilState(usuariosState); //dados dos usuarios existentes

    return( 
        <div id={styles.loja}>
            <div id={styles.divTable}>
                <table>
                    <thead>
                        <tr>
                            <td>
                                Nome Produto
                            </td>
                            <td>
                                Valor
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                    </thead>
                    <tbody id={styles.tableBody}>
                        <tr>
                            <td>Chaveiro Dell</td>
                            <td>50</td>
                            <td><button></button></td>
                        </tr>
                        <tr>
                            <td>Caneta Dell</td>
                            <td>30</td>
                            <td><button></button></td>
                        </tr>
                        <tr>
                            <td>Colher de Madeira</td>
                            <td>100</td>
                            <td><button></button></td>
                        </tr>
                        <tr>
                            <td>Beyblade de Metal</td>
                            <td>500</td>
                            <td><button></button></td>
                        </tr>
                        <tr>
                            <td>Playstation 5</td>
                            <td>1000</td>
                            <td><button></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id={styles.footer}>
                <Link className={styles.link} to="/">Voltar</Link>
            </div>
        </div>
    )
}

export default Loja;