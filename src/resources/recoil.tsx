import { useState } from "react";
import { atom, selector } from "recoil";

type Aposta = {
    id: number;
    numeros: number[];
}

type Pessoa = {
    id: number;
    nome: string;
    cpf: string;
    aposta: Aposta[] | [];
}

export const contadorId = atom<number>({
    key: 'id',
    default: 0,
})

export const contadorIdAposta = atom<number>({
    key: 'idAposta',
    default: 1000,
})

export const usuariosState = atom<Pessoa[]>({
    key: 'usuariosState',
    default: [],
})