package com.victorMarchiDev.mvp.dto;

import com.victorMarchiDev.mvp.enums.StatusProposta;
import com.victorMarchiDev.mvp.model.ProdutoPropostaModel;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record PropostaDTO(
        Long id,
        LocalDate dataInicio,
        LocalDate dataFim,
        StatusProposta status,
        Long cotacaoId,
        List<ProdutoPropostaDTO> produtos
) {}
