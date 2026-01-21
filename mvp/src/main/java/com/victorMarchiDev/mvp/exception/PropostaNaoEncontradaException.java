package com.victorMarchiDev.mvp.exception;

public class PropostaNaoEncontradaException extends RuntimeException {
    public PropostaNaoEncontradaException(Long id) {
        super("Proposta com id " + id + " não encontrado!");
    }
}
