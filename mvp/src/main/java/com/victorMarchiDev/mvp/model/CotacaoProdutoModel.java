package com.victorMarchiDev.mvp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_cotacao_produto")
public class CotacaoProdutoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cotacao_id", nullable = false)
    private CotacaoModel cotacao;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private ProdutoModel produto;

    @Column(nullable = false)
    private Double precoInformado;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public CotacaoModel getCotacao() { return cotacao; }
    public void setCotacao(CotacaoModel cotacao) { this.cotacao = cotacao; }

    public ProdutoModel getProduto() { return produto; }
    public void setProduto(ProdutoModel produto) { this.produto = produto; }

    public Double getPrecoInformado() { return precoInformado; }
    public void setPrecoInformado(Double precoInformado) { this.precoInformado = precoInformado; }
}
