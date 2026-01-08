package com.victorMarchiDev.mvp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_produto_pedido")
public class ProdutoPedidoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private PedidoModel pedido;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private ProdutoModel produto;

    @Column(nullable = false)
    private Double preco;

}
