package com.victorMarchiDev.mvp.exception;

public class EmailCadastradoException extends RuntimeException {
    public EmailCadastradoException() {
        super("Este email já está cadastrado!");
    }
}
