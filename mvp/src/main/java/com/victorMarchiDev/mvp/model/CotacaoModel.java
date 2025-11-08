package com.victorMarchiDev.mvp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.victorMarchiDev.mvp.enums.StatusCotacao;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "TB_Cotacao")
public class CotacaoModel {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(
            name = "cotacao_fornecedor",
            joinColumns = @JoinColumn(name = "cotacao_id"),
            inverseJoinColumns = @JoinColumn(name = "fornecedor_id")
    )
    private List<FornecedorModel> fornecedoresCotacao;

    @ManyToMany
    @JoinTable(
            name = "cotacao_produto",
            joinColumns = @JoinColumn(name = "cotacao_id"),
            inverseJoinColumns = @JoinColumn(name = "produto_id")
    )
    private List<ProdutoModel> produtosCotacao;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataInicio;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataFim;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusCotacao status;

    public CotacaoModel() {  }

    public CotacaoModel(Long id, String name, List<FornecedorModel> fornecedoresCotacao, List<ProdutoModel> produtosCotacao, LocalDate dataInicio, LocalDate dataFim, String status) {
        this.id = id;
        this.name = name;
        this.fornecedoresCotacao = fornecedoresCotacao;
        this.produtosCotacao = produtosCotacao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<FornecedorModel> getFornecedoresCotacao() {
        return fornecedoresCotacao;
    }

    public void setFornecedoresCotacao(List<FornecedorModel> fornecedoresCotacao) {
        this.fornecedoresCotacao = fornecedoresCotacao;
    }

    public List<ProdutoModel> getProdutosCotacao() {
        return produtosCotacao;
    }

    public void setProdutosCotacao(List<ProdutoModel> produtosCotacao) {
        this.produtosCotacao = produtosCotacao;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public void setStatus(StatusCotacao statusCotacao) {

    }
}