package com.victorMarchiDev.mvp.dto;

import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;

public record ProdutoCotacaoDTO(
         Long id,
         String nomeProduto,
         String marca,
         Double quantidade
) {}
