package com.victorMarchiDev.mvp.dto;

import com.victorMarchiDev.mvp.enums.StatusProposta;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record PropostaDTO(
        Long id,

        LocalDate dataCriacao,

        LocalDate dataResposta,

        @NotNull
        StatusProposta status,

        @NotNull
        Long cotacaoId,

        @NotNull
        Long fornecedorId,

        @NotNull
        Long compradorId,

        List<ProdutoCotacaoDTO> itens
) {}
