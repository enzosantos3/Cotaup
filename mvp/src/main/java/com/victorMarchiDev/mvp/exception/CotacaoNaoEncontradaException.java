package com.victorMarchiDev.mvp.exception;

public class CotacaoNaoEncontradaException extends RuntimeException {
    public CotacaoNaoEncontradaException(Long id) {
        super("Cotacao com o id " + id + " nao encontrada!");
    }
}
