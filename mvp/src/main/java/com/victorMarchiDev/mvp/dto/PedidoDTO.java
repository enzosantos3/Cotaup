package com.victorMarchiDev.mvp.dto;

import com.victorMarchiDev.mvp.enums.StatusPedido;

import java.time.LocalDate;

public record PedidoDTO(
        Long id,
        LocalDate criadoEm,
        Long idComprador,
        Long idFornecedor,
        Long idCotacao,
        Long idUsuarioCriador,
        StatusPedido status
) {}
