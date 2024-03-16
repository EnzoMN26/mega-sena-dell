import { atom } from "recoil";

type Aposta = {
    id: number;
    numeros: number[];
}

type Pessoa = {
    nome: string;
    cpf: number;
    aposta: Aposta;
}

const usuariosState = atom<Pessoa[]>({
    key: 'usuariosState',
    default: [],
})

export default usuariosState;