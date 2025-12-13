package com.victorMarchiDev.mvp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.annotation.processing.Generated;

@Entity
@Table(name = "TB_Fornecedor")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FornecedorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeFantasia;
    private String razaoSocial;
    private String cnpj;
    private Long inscricaoEstadual;
    private String representante;
    private String endereco;
    private String telefone;
    private String email;

}
