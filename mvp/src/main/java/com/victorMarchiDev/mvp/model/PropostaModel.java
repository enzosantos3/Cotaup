package com.victorMarchiDev.mvp.model;

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

    private LocalDate dataCriacao;

    private LocalDate dataResposta;

    @ManyToOne
    @JoinColumn(name = "cotacao_id")
    private CotacaoModel cotacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusProposta statusProposta;

    @ManyToOne
    @JoinColumn(name = "fornecedor_id")
    private FornecedorModel fornecedorModel;

    @ManyToOne
    @JoinColumn(name = "comprador_id")
    private CompradorModel compradorModel;

    @OneToMany(mappedBy = "proposta")
    private List<ProdutoCotacaoModel> itensProposta;




}
