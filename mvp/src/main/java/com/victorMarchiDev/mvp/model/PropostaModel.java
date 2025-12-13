package com.victorMarchiDev.mvp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "TB_Proposta")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PropostaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeProduto;
    private BigDecimal precoProposto;

    @ManyToOne
    @JoinColumn(name = "cotacao_id")
    private CotacaoModel cotacao;

}
