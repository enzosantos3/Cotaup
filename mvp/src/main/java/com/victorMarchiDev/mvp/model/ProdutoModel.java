package com.victorMarchiDev.mvp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "TB_Produtos")
public class ProdutoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String marca;
    private String categoria;
    private String unidade;
    private Double quantidade;
    private Long codigoEAN;

    public ProdutoModel() {
    }

    public ProdutoModel(Long id, String nome, String marca, String categoria, String unidade, Double quantidade, Long codigoEAN) {
        this.id = id;
        this.nome = nome;
        this.marca = marca;
        this.categoria = categoria;
        this.unidade = unidade;
        this.quantidade = quantidade;
        this.codigoEAN = codigoEAN;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCodigoEAN() {
        return codigoEAN;
    }

    public void setCodigoEAN(Long codigoEAN) {
        this.codigoEAN = codigoEAN;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getUnidade() {
        return unidade;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }
}
