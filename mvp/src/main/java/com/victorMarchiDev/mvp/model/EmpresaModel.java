package com.victorMarchiDev.mvp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_empresa")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmpresaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeFantasia;
    private String razaoSocial;
    private String cnpj;
    private String inscricaoEstadual;
    private String endereco;
}
