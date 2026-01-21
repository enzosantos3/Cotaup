package com.victorMarchiDev.mvp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "tb_produtos_cotacao")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProdutoCotacaoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cotacao_id", nullable = false)
    private CotacaoModel cotacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produto_id", nullable = false)
    private ProdutoModel produto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proposta_id")
    private PropostaModel proposta;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(name = "valor_unitario", nullable = false, precision = 15, scale = 2)
    private BigDecimal valorUnitario;

    @Column(name = "valor_total", nullable = false, precision = 15, scale = 2)
    private BigDecimal valorTotal;
}
