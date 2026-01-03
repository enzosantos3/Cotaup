package com.victorMarchiDev.mvp.dto;

public record EmpresaDTO(
         Long id,
         String nomeFantasia,
         String razaoSocial,
         String cnpj,
         String inscricaoEstadual,
         String endereco
) {}
