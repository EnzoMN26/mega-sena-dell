import { Outlet } from "react-router-dom";
import styles from "../styles/Home.module.css"

const Home: React.FC = () => {
    return <>
    <div id={styles.centralView}>
        <Outlet />
    </div>
    </>
}
export default Home;