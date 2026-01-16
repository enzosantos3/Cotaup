package com.victorMarchiDev.mvp.dto;

import com.victorMarchiDev.mvp.model.EmpresaModel;

public record CompradorDTO(
        Long id,
        Long usuarioId,
        Long empresaId
) {}
