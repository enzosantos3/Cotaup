package com.victorMarchiDev.mvp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CompradorNaoEncontradoException extends RuntimeException {
    public CompradorNaoEncontradoException(Long id) {
        super("Comprador com o id " + id + "não encontrado!");
    }
}
