package com.victorMarchiDev.mvp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "TB_Produtos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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

}
