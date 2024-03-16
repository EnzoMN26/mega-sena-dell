import { Link } from "react-router-dom";
import styles from "../styles/Aposta.module.css"

const Aposta: React.FC = () => {
    return( 
        <div id={styles.aposta}>
        <div className={styles.gridContainer}>
            <button className={styles.gridItem}>1</button>
            <button className={styles.gridItem}>2</button>
            <button className={styles.gridItem}>3</button>
            <button className={styles.gridItem}>4</button>
            <button className={styles.gridItem}>5</button>
            <button className={styles.gridItem}>6</button>
            <button className={styles.gridItem}>7</button>
            <button className={styles.gridItem}>8</button>
            <button className={styles.gridItem}>9</button>
            <button className={styles.gridItem}>10</button>
            <button className={styles.gridItem}>11</button>
            <button className={styles.gridItem}>12</button>
            <button className={styles.gridItem}>13</button>
            <button className={styles.gridItem}>14</button>
            <button className={styles.gridItem}>15</button>
            <button className={styles.gridItem}>16</button>
            <button className={styles.gridItem}>17</button>
            <button className={styles.gridItem}>18</button>
            <button className={styles.gridItem}>19</button>
            <button className={styles.gridItem}>20</button>
            <button className={styles.gridItem}>21</button>
            <button className={styles.gridItem}>22</button>
            <button className={styles.gridItem}>23</button>
            <button className={styles.gridItem}>24</button>
            <button className={styles.gridItem}>25</button>
            <button className={styles.gridItem}>26</button>
            <button className={styles.gridItem}>27</button>
            <button className={styles.gridItem}>28</button>
            <button className={styles.gridItem}>29</button>
            <button className={styles.gridItem}>30</button>
            <button className={styles.gridItem}>31</button>
            <button className={styles.gridItem}>32</button>
            <button className={styles.gridItem}>33</button>
            <button className={styles.gridItem}>34</button>
            <button className={styles.gridItem}>35</button>
            <button className={styles.gridItem}>36</button>
            <button className={styles.gridItem}>37</button>
            <button className={styles.gridItem}>38</button>
            <button className={styles.gridItem}>39</button>
            <button className={styles.gridItem}>40</button>
            <button className={styles.gridItem}>41</button>
            <button className={styles.gridItem}>42</button>
            <button className={styles.gridItem}>43</button>
            <button className={styles.gridItem}>44</button>
            <button className={styles.gridItem}>45</button>
            <button className={styles.gridItem}>46</button>
            <button className={styles.gridItem}>47</button>
            <button className={styles.gridItem}>48</button>
            <button className={styles.gridItem}>49</button>
            <button className={styles.gridItem}>50</button>
        </div>
        <div id={styles.visor}>
            <div className={styles.escolhido}>1</div>
            <div className={styles.escolhido}>2</div>
            <div className={styles.escolhido}>3</div>
            <div className={styles.escolhido}>4</div>
            <div className={styles.escolhido}>5</div>
        </div>
        <div id={styles.footer}>
            <Link id={styles.voltar} to="/">Voltar</Link>
            <button id={styles.surpresinha}>SURPRESINHA</button>
            <div id={styles.rightButtons}>
            <button className={styles.botao}>Confirmar Aposta</button>
            <Link className={styles.botao} to="/">Confirmar e Voltar</Link>
            </div>        
        </div>
    </div>
    )
}

export default Aposta;