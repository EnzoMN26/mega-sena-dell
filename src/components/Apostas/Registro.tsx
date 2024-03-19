import { Link } from "react-router-dom";
import styles from "../../styles/Registro.module.css";
import { useRecoilState } from "recoil";
import { usuariosState, contadorId } from "../../resources/recoil";
import { useEffect, useRef, useState } from "react";

const Registro: React.FC = () => {
  const [usuarios, setUsuarios] = useRecoilState(usuariosState); //dados dos usuarios existentes
  const [idGlobal, setIdGlobal] = useRecoilState(contadorId); //id global de usuarios
  const [nome, setNome] = useState(""); //nome do usuario se cadastrando
  const [cpf, setCpf] = useState(""); //cpf do usuario se cadastrando
  const [validacao, setValidacao] = useState(false); //booleano para verificar a validação dos campos de registro
  const [avisoErro, setAvisoErro] = useState(""); //guarda a mensagem de erro ao preencher os campos
  const id = useRef(0); //id do usuario se cadastrando

  //caso o cpf utilizado ja esteja mapeado a alguma pessoa, ele encontra e passa o id da pessoa ja existente para o proximo componente.
  //caso contrário ele passa um novo id ainda não utilizado
  const setPessoa = () => {
    var pessoa = usuarios.find((e) => e.cpf == cpf);
    if (pessoa != undefined) {
      id.current = pessoa.id;
    } else {
      id.current = idGlobal + 1;
      setIdGlobal(id.current);
    }
  };

  const mostraAvisoErro = () => {
    if (nome == "") {
      setAvisoErro("campo Nome vazio");
    } else {
      setAvisoErro("campo CPF inválido");
    }
  };

  //realiza a validação da pessoa quando os componentes estão ambos preenchidos
  useEffect(() => {
    if (nome != "" && cpf.length == 11) {
      setValidacao(true);
      setPessoa();
    } else {
      setValidacao(false);
    }
  }, [nome, cpf]);

  return (
    <div id={styles.registro}>
      <div id={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="nome">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            className={styles.input}
            maxLength={32}
            placeholder="Insira seu Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value.replace(/[^A-Za-z\s]/, ""))}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="cpf">
            CPF:
          </label>
          <input
            type="text"
            id="cpf"
            className={styles.input}
            maxLength={11}
            placeholder="Insira seu CPF de 11 dígitos"
            value={cpf}
            onChange={(e) => setCpf(e.target.value.replace(/[^0-9]/, ""))}
          />
        </div>
      </div>
      <div id={styles.footer}>
        <Link className={styles.botao} to="/">
          Voltar
        </Link>
        <div id={styles.aviso}>{avisoErro}</div>
        {validacao ? (
          <Link
            className={styles.botao}
            to="/aposta"
            state={{ id: id.current, nome: nome, cpf: cpf }}
          >
            Confirmar
          </Link>
        ) : (
          <button onClick={mostraAvisoErro} className={styles.botao}>
            Confirmar
          </button>
        )}
      </div>
    </div>
  );
};

export default Registro;
