import { Link } from "react-router-dom";
import styles from "../../styles/LojaLogin.module.css";
import { useRecoilState } from "recoil";
import { usuariosState } from "../../resources/recoil";
import { useEffect, useRef, useState } from "react";

//Componente responsavel por renderizar a tela de login da loja
const LoginPessoa: React.FC = () => {
  const [usuarios] = useRecoilState(usuariosState); //dados dos usuarios existentes
  const [cpf, setCpf] = useState(""); //cpf do usuario se cadastrando
  const [validacao, setValidacao] = useState(false); //booleano para verificar a validação dos campos de registro
  const [avisoErro, setAvisoErro] = useState(""); //guarda a mensagem de erro ao preencher os campos
  const id = useRef(0); //id do usuario se cadastrando

  //retorna verdadeiro caso exista alguem cadastrado com o cpf informado, e falso caso contrario
  function findPessoa(): boolean {
    var pessoa = usuarios.find((e) => e.cpf == cpf);
    if (pessoa != undefined) {
      id.current = pessoa.id;
      return true;
    }
    return false;
  }

  //monitora o input do cpf, chamando a funcao que valido o mesmo caso o input respeite os requesitos
  useEffect(() => {
    if (cpf.length == 11) {
      findPessoa() ? setValidacao(true) : setValidacao(false);
    } else {
      setValidacao(false);
    }
  }, [cpf]);

  return (
    <div id={styles.login}>
      <div id={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="cpf">
            CPF:
          </label>
          <input
            type="text"
            id="cpf"
            className={styles.input}
            maxLength={11}
            value={cpf}
            placeholder="Digite um CPF já cadastrado"
            onChange={(e) => setCpf(e.target.value.replace(/[^0-9]/, ""))}
          />
        </div>
      </div>
      <div id={styles.footer}>
        <Link className={styles.botao} to="/menu">
          Voltar
        </Link>
        <div id={styles.aviso}>{avisoErro}</div>
        {validacao ? (
          <Link className={styles.botao} to="/loja" state={{ id: id.current }}>
            Confirmar
          </Link>
        ) : (
          <button
            onClick={() => setAvisoErro("CPF não encontrado")}
            className={styles.botao}
          >
            Confirmar
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPessoa;
