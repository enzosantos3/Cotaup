package com.victorMarchiDev.mvp.dto;

public record FornecedorDTO (
        Long id,
        String nome,
        String email,
        Long empresaId
) {}
