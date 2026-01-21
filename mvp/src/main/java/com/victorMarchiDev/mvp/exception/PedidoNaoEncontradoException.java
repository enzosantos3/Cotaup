package com.victorMarchiDev.mvp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PedidoNaoEncontradoException extends RuntimeException {
  public PedidoNaoEncontradoException(Long id) {
    super("Pedido com o id " + id + "não encontrado!");
  }
}
