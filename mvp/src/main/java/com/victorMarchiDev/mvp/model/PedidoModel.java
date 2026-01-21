package com.victorMarchiDev.mvp.model;

import com.victorMarchiDev.mvp.enums.StatusPedido;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "tb_pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate criadoEm;

    @ManyToOne
    @JoinColumn(name = "comprador_id", nullable = false)
    private CompradorModel comprador;

    @ManyToOne
    @JoinColumn(name = "fornecedor_id", nullable = false)
    private FornecedorModel fornecedor;

    @ManyToOne
    @JoinColumn(name = "cotacao_id", nullable = false)
    private CotacaoModel cotacao;

    @ManyToOne
    @JoinColumn(name = "usuario_criador_id", nullable = false)
    private UsuarioModel usuarioCriador;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusPedido status;

    @Column(nullable = false ,precision = 15, scale = 2)
    private BigDecimal subTotal;
}
