package com.victorMarchiDev.mvp.dto;

public record ProdutoDTO (
        Long id,
        String nome,
        String marca,
        String categoria,
        String unidade,
        Double quantidade,
        Long codigoEAN
) {}
