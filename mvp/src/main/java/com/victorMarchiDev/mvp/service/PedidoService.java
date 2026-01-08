package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.dto.PedidoDTO;
import com.victorMarchiDev.mvp.exception.CompradorNaoEncontradoException;
import com.victorMarchiDev.mvp.exception.CotacaoNaoEncontradaException;
import com.victorMarchiDev.mvp.exception.FornecedorNaoEncontradoException;
import com.victorMarchiDev.mvp.mapper.PedidoMapper;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.PedidoModel;
import com.victorMarchiDev.mvp.repository.CompradorRepository;
import com.victorMarchiDev.mvp.repository.CotacaoRepository;
import com.victorMarchiDev.mvp.repository.FornecedorRepository;
import com.victorMarchiDev.mvp.repository.PedidoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final PedidoMapper mapper;
    private final FornecedorRepository fornecedorRepository;
    private final CotacaoRepository cotacaoRepository;
    private final CompradorRepository compradorRepository;

    public PedidoDTO criarPedido(PedidoDTO dto) {

        PedidoModel pedido = new PedidoModel();
        pedido.setCriadoEm(LocalDate.now());

        pedido.setCotacao(
                cotacaoRepository.findById(dto.idCotacao())
                        .orElseThrow(() ->
                                new CotacaoNaoEncontradaException(dto.idCotacao()))
        );

        pedido.setFornecedor(
                fornecedorRepository.findById(dto.idFornecedor())
                        .orElseThrow(() ->
                                new FornecedorNaoEncontradoException(dto.idFornecedor()))
        );

        pedido.setComprador(
                compradorRepository.findById(dto.idComprador())
                        .orElseThrow(() ->
                                new CompradorNaoEncontradoException(dto.idComprador()))
        );

        PedidoModel salvo = pedidoRepository.save(pedido);
        return mapper.toDto(salvo);
    }

    public List<PedidoDTO> listarPedidos() {
        return pedidoRepository.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
    }
}
