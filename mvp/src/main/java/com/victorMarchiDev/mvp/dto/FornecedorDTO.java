package com.victorMarchiDev.mvp.dto;

public record FornecedorDTO (
         Long id,
         String nomeFantasia,
         String razaoSocial,
         String cnpj,
         Long inscricaoEstadual,
         String representante,
         String endereco,
         String telefone,
         String email
) {}
