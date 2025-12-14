package com.victorMarchiDev.mvp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @ManyToOne
    @JoinColumn(name = "cotacao_id", nullable = false)
    private CotacaoModel cotacao;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private ProdutoModel produto;

}
