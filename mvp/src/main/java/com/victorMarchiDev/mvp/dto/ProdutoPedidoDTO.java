package com.victorMarchiDev.mvp.dto;

public record ProdutoPedidoDTO(
        Long id,
        Long idProduto,
        Long idPedido,
        Double preco
) {}
