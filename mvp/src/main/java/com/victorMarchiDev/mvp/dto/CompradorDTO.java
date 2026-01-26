package com.victorMarchiDev.mvp.dto;

import com.victorMarchiDev.mvp.enums.Role;
import com.victorMarchiDev.mvp.model.EmpresaModel;

public record CompradorDTO(
        Long id,
        Long usuarioId,
        Long empresaId,
        String email,
        String nomeFantasia,
        String cnpj,
        Role role,
        String razaoSocial,
        String inscricaoEstadual,
        String endereco
) {}
