package com.victorMarchiDev.mvp.dto;

import com.victorMarchiDev.mvp.enums.Role;

public record FornecedorDTO (
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
