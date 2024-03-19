import { useState } from "react";
import { atom, selector } from "recoil";

export type Aposta = {
    id: number;
    numeros: number[];
}

export type Item = {
    id: string;
    quantidade: number;
}

export type Pessoa = {
    id: number;
    nome: string;
    cpf: string;
    dinheiro: number;
    aposta: Aposta[] | [];
    itens: Item[] | [];
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