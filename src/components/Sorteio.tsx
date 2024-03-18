import { Link } from "react-router-dom";
import styles from "../styles/Sorteio.module.css"
import { useRecoilState } from "recoil";
import { Aposta, Pessoa, usuariosState } from "../resources/recoil";
import { useEffect, useRef, useState } from "react";

//Objetos apenas para teste em desenvolvimento (trocar suas chamadas depois dos testes)
const pessoasTeste = [{
    id: 2020,
    nome: "Enzo",
    cpf: "02304950321",
    aposta: [{ id: 2323, numeros: [11, 22, 33, 44, 55] }, { id: 2325, numeros: [1, 2, 7, 5, 8] }]
},
{
    id: 2021,
    nome: "Renata",
    cpf: "02354950321",
    aposta: [{ id: 2326, numeros: [1, 2, 3, 4, 5] }]
}]

const Sorteio: React.FC = () => {
    const [usuarios, setUsuarios] = useRecoilState(usuariosState); //dados dos usuarios existentes
    const [loader, setLoader] = useState(false); //boolean para controlar o aparecimento do loader. (que serve apenas como um toque visual)
    const [iniciar, setIniciar] = useState(true); //boolean para controlar o aparecimento do botao de iniciar sorteio.
    const [numGanhador, setNumGanhador] = useState<number[]>([]); //resultado do sorteio
    const [ganhadores, setGanhadores] = useState<Pessoa[]>([]); //guarda os ganhadores do sorteio, ja com apenas as apostas vencedoras filtradas
    const qntNumApostados = useRef<number[]>(Array(50).fill(0)); //array de 50 numeros, inicializado em 0, para armazenar as quantidade que cada um é apostado. O indice + 1 no array representa o numero.

    //compara dois arrays, vendo se o primeiro possui pelo menos 5 elementos iguais ao segundo
    function comparaApostas(a: number[], b: number[]): boolean {
        var count: number = 0;
        b.forEach(element => {
            a.includes(element) ? count++ : null
        });
        return count == 5 ? true : false;
    }

    //organiza o array de numeros apostados através de seus indices.
    function organizaNumApostados(numeros : number[]){
        return numeros.map((e, index) => 
        ({ numero: index + 1, quant: e })).sort((a, b) => 
        {
        return b.quant - a.quant;
        }).filter(e => e.quant>0)
    }

    //executa o sorteio
    function realizarSorteio() {

        setLoader(true);

        var ganhadoresAux: Pessoa[] = [];
        var numGanhadorTemp: number[] = [];

        //sorteia 4 numeros an tes de entrar no while responsavel por realizar o sorteio 25 vezes
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
        }

        //faz a contagem dos numeros apostados e suas quantidades
        usuarios.forEach(usuario => {
            usuario.aposta.map(aposta => {
                aposta.numeros.forEach(num => qntNumApostados.current[num - 1] = qntNumApostados.current[num - 1] + 1)
            })
        })


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
                <>  <div id={styles.divIniciar}>
                        <button className={styles.botao} onClick={() => realizarSorteio()}>Iniciar Sorteio</button>
                    </div>
                    <div id={styles.footerInicial}>
                        <Link className={styles.link} to="/">Voltar</Link>
                    </div>
                </> :
                <div id={styles.resultado}>
                    <div id={styles.resultadoHeader}>
                        <div>Numeros sorteados</div>
                        <div>{numGanhador.map(e => <span className={styles.numResultado}>{e}  </span>)}</div>
                    </div>
                    {pessoasTeste.length > 0 ?
                        <div>
                            <div>Ganhadores</div>
                            <table id={styles.table}>
                                <thead>
                                    <tr>
                                        <td>
                                            Nome
                                        </td>
                                        <td>
                                            Cpf
                                        </td>
                                        <td>
                                            ID Aposta
                                        </td>
                                        <td>
                                            Aposta
                                        </td>
                                    </tr>
                                </thead>
                                <tbody id={styles.tableBody}>
                                    {pessoasTeste.map(ganhador => {
                                        return ganhador.aposta.map((aposta, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{ganhador.nome}</td>
                                                    <td>{ganhador.cpf}</td>
                                                    <td>{aposta.id}</td>
                                                    <td>{aposta.numeros.map(numero => `${numero} `)}</td>
                                                </tr>
                                            )
                                        })
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        <div>Não há Ganhadores</div>
                    }
                    <div id={styles.footer}>
                        <div id={styles.numerosApostados}>
                            <div>Número:Quantidade de Escolhas</div>
                            <div id={styles.listaApostados}>
                                {organizaNumApostados(qntNumApostados.current).map(e => 
                                    <div>{`${e.numero}:${e.quant}`}</div>)}
                            </div>
                        </div>
                        <Link className={styles.link} to="/">Confirmar</Link>
                    </div>
                </div>
            }
        </div>
    )
}
//qntNumApostados.current.map((e, index) => <div>{`${index+1}:${e}`}</div>
export default Sorteio;