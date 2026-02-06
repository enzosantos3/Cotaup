package com.victorMarchiDev.mvp.dto;

import java.math.BigDecimal;

public record ProdutoPropostaDTO(
   Long id,
   Long produtoId,
   String nomeProduto,
   Integer quantidade,
   BigDecimal valorUnitario,
   BigDecimal valorTotal
) {}
