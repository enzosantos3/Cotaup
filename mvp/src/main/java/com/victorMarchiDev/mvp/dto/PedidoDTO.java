package com.victorMarchiDev.mvp.dto;

import java.time.LocalDate;

public record PedidoDTO(
        Long id,
        LocalDate criadoEm,
        Long idComprador,
        Long idFornecedor,
        Long idCotacao
) {}
