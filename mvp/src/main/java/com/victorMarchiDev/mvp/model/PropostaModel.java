package com.victorMarchiDev.mvp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.victorMarchiDev.mvp.enums.StatusProposta;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.mapstruct.EnumMapping;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "tb_proposta")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PropostaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataInicio;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataFim;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusProposta status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cotacao_id")
    private CotacaoModel cotacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fornecedor_id")
    private FornecedorModel fornecedorModel;


    @OneToMany(
            mappedBy = "proposta",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ProdutoPropostaModel> produtos;

}
