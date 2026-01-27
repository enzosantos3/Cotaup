package com.victorMarchiDev.mvp.dto;

import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record ProdutoCotacaoDTO(
         Long id,
         Long cotacaoId,
         Long produtoId,
         String nomeProduto,
         Long propostaId,
         Integer quantidade,
         BigDecimal valorUnitario,
         BigDecimal valorTotal
) {}
