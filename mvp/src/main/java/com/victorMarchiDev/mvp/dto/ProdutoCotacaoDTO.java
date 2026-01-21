package com.victorMarchiDev.mvp.dto;

import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record ProdutoCotacaoDTO(
         Long id,

         @NotNull
         Long cotacaoId,

         @NotNull
         Long produtoId,

         Long propostaId,

         @NotNull
         @Positive
         Integer quantidade,

         @NotNull
         @PositiveOrZero
         BigDecimal valorUnitario,

         BigDecimal valorTotal
) {}
