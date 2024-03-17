import { Link } from "react-router-dom";
import styles from "../styles/Sorteio.module.css"
import { useRecoilState } from "recoil";
import { Aposta, Pessoa, usuariosState } from "../resources/recoil";
import { useEffect, useState } from "react";

const pessoasTeste = [{
    id: 2020,
    nome: "Enzo",
    cpf: "02304950321",
    aposta: [{id: 2323, numeros: [1,2,3,4,5]}, {id: 2325, numeros: [1,2,7,5,8]}]
},
{
    id: 2021,
    nome: "Renata",
    cpf: "02354950321",
    aposta: [{id: 2323, numeros: [1,2,3,4,5]}]
}]

const Sorteio: React.FC = () => {
    const [usuarios, setUsuarios] = useRecoilState(usuariosState); //dados dos usuarios existentes
    const [loader, setLoader] = useState(false); //boolean para controlar o aparecimento do loader. (que serve apenas como um toque visual)
    const [iniciar, setIniciar] = useState(true); //boolean para controlar o aparecimento do botao de iniciar sorteio.
    const [numGanhador, setNumGanhador] = useState<number[]>([]); //resultado do sorteio
    const [ganhadores, setGanhadores] = useState<Pessoa[]>([]);

    //compara dois arrays, vendo se o primeiro possui pelo menos 5 elementos iguais ao segundo
    function comparaApostas(a: number[], b: number[]): boolean {
        var count: number = 0;
        b.forEach(element => {
            a.includes(element) ? count++ : null
        });
        count == 5 ? console.log(a, b) : console.log();
        return count == 5 ? true : false;
    }

    //executa o sorteio
    function realizarSorteio() {

        setLoader(true);

        var ganhadoresAux: Pessoa[] = [];
        var numGanhadorTemp: number[] = [];

        //sorteia 4 numeros antes de entrar no while responsavel por realizar o sorteio 25 vezes
        while (numGanhadorTemp.length < 4) {
            const num = Math.floor(Math.random() * 50) + 1
            if (!numGanhadorTemp.includes(num)) {
                numGanhadorTemp.push(num)
            }
        }

        var counter: number = 0;

        //realiza o sorteio dos numeros enquanto confere os vencedores, acaba depois de 25 tentativas ou depois de um vencedor
        while (ganhadoresAux.length < 1 && counter <= 25) {
            var num = 0;
            do {
                num = Math.floor(Math.random() * 50) + 1
            }
            while (numGanhadorTemp.includes(num))

            numGanhadorTemp.push(num);

            setNumGanhador(numGanhadorTemp);

            //filtra pelas pessoas que acertaram alguma aposta
            usuarios.forEach(user => {
                var apostas: Aposta[] = user.aposta.filter(aposta => comparaApostas(aposta.numeros, numGanhadorTemp))
                if (apostas.length > 0) {
                    ganhadoresAux.push(
                        {
                            id: user.id,
                            nome: user.nome,
                            cpf: user.cpf,
                            aposta: apostas
                        })
                }
            })
            setGanhadores(ganhadoresAux);
            counter++;
            console.log(numGanhadorTemp)
        }

        //desliga o simbolo de carregando depois de 1 segundo
        setTimeout(() => {
            setIniciar(false)
        }, 1000);
    }

    return (
        <div id={styles.sorteio}>
            {iniciar ? loader ?
                <>
                    <div id={styles.sorteando}>Sorteando</div>
                    <div id={styles.loader}></div>
                </> :
                <>
                    <button className={styles.botao} onClick={() => realizarSorteio()}>Iniciar Sorteio</button>
                </> :
                <div id={styles.resultado}>
                    <div id={styles.resultadoHeader}>
                        <div>Numeros sorteados</div>
                        <div>{numGanhador.map(e => <span className={styles.numResultado}>{e}  </span>)}</div>
                    </div>
                    <table id={styles.table}>
                        <tbody id={styles.tableBody}>
                            {pessoasTeste.map((ganhador) => {
                                return (
                                    <tr key={ganhador.id}>
                                        <td>{ganhador.nome}</td>
                                        <td>{ganhador.cpf}</td>
                                        <td>{ganhador.aposta[0].id}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Sorteio;