package com.victorMarchiDev.mvp.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "TB_Proposta")
public class PropostaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeProduto;
    private BigDecimal precoProposto;

    @ManyToOne
    @JoinColumn(name = "cotacao_id")
    private CotacaoModel cotacao;

    public PropostaModel (){}

    public PropostaModel(Long id, String nomeProduto, BigDecimal precoProposto, CotacaoModel cotacao) {
        this.id = id;
        this.nomeProduto = nomeProduto;
        this.precoProposto = precoProposto;
        this.cotacao = cotacao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public BigDecimal getPrecoProposto() {
        return precoProposto;
    }

    public void setPrecoProposto(BigDecimal precoProposto) {
        this.precoProposto = precoProposto;
    }

    public CotacaoModel getCotacao() {
        return cotacao;
    }

    public void setCotacao(CotacaoModel cotacao) {
        this.cotacao = cotacao;
    }
}
