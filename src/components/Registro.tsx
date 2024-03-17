import { Link } from "react-router-dom";
import styles from "../styles/Registro.module.css"
import { useRecoilState } from "recoil";
import {usuariosState, contadorId} from "../resources/recoil";
import { useEffect, useRef, useState } from "react";

const Registro: React.FC = () => {
    const [usuarios, setUsuarios] = useRecoilState(usuariosState);
    const [idGlobal, setIdGlobal] = useRecoilState(contadorId);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const id = useRef(0);
    const [validacao, setValidacao] = useState(false);

    const setPessoa = () => {
        var pessoa = usuarios.find(e => e.cpf == cpf);
        if(pessoa != undefined){
            id.current = pessoa.id;
        }
        else{
            setIdGlobal(idGlobal+1);
            id.current = idGlobal;
        }
    }
    
    useEffect(() => {
        if(nome != "" && cpf.length == 11){
            setValidacao(true);
            setPessoa();
        }else{
            setValidacao(false);
        }
    }, [nome, cpf]);

    return (
        <div id={styles.registro}>
            <div id={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" className={styles.input} maxLength={50} value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="cpf">CPF:</label>
                    <input type="text" id="cpf" className={styles.input} maxLength={11} value={cpf} onChange={(e) => setCpf(e.target.value.replace(/[^0-9]/, ""))} />
                </div>
            </div>
            <div id={styles.footer}>
                <Link className={styles.botao} to="/" >Voltar</Link>
                {validacao? 
                <Link className={styles.botao} to='/aposta' state={{id: id.current, nome: nome, cpf: cpf}}>Confirmar</Link> :
                <Link className={styles.botao} to="/registro">Confirmar</Link>}
            </div>
        </div>
    )
}

export default Registro;