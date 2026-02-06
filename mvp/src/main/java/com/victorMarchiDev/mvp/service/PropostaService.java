package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.dto.PropostaDTO;
import com.victorMarchiDev.mvp.enums.StatusCotacao;
import com.victorMarchiDev.mvp.enums.StatusProposta;
import com.victorMarchiDev.mvp.exception.CotacaoNaoEncontradaException;
import com.victorMarchiDev.mvp.exception.PropostaNaoEncontradaException;
import com.victorMarchiDev.mvp.mapper.PropostaMapper;
import com.victorMarchiDev.mvp.model.*;
import com.victorMarchiDev.mvp.repository.*;
import com.victorMarchiDev.mvp.security.UserDetailsImpl;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PropostaService {

    private final CotacaoRepository cotacaoRepository;
    private final PropostaRepository propostaRepository;
    private final ProdutoCotacaoRepository produtoCotacaoRepository;
    private final PropostaMapper mapper;
    private final ProdutoRepository produtoRepository;
    private final FornecedorRepository fornecedorRepository;

    @Transactional
    public PropostaDTO criarProposta(Long cotacaoId, PropostaDTO dto) {

        UserDetailsImpl user = (UserDetailsImpl) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        Long usuarioId = user.getId();

        PropostaModel proposta = mapper.toEntity(dto);

        CotacaoModel cotacao = cotacaoRepository.findById(cotacaoId)
                .orElseThrow(() -> new RuntimeException("Cotação não encontrada"));

        FornecedorModel fornecedor = fornecedorRepository.findByUsuarioId(usuarioId)
                .orElseThrow( () -> new RuntimeException("Fornecedor não encontrado"));

        proposta.setCotacao(cotacao);
        proposta.setStatus(StatusProposta.CRIADA);
        proposta.setDataInicio(dto.dataInicio());
        proposta.setFornecedorModel(fornecedor);


        for (ProdutoPropostaModel pc : proposta.getProdutos()){

            ProdutoModel produto = produtoRepository.findById(
                    pc.getProduto().getId()
            ).orElseThrow(()-> new RuntimeException("Produto não encontrado"));

            pc.setProduto(produto);
            pc.setProposta(proposta);

            BigDecimal valorTotal =
                    pc.getValorUnitario()
                            .multiply(BigDecimal.valueOf(pc.getQuantidade()));
            pc.setValorTotal(valorTotal);
        }

        cotacao.setStatus(StatusCotacao.FINALIZADA);
        cotacaoRepository.save(cotacao);

        PropostaModel salva = propostaRepository.save(proposta);

        return mapper.toDTO(salva);
    }

    public List<PropostaDTO> listarPropostas() {
        return propostaRepository.findAllComProdutos()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    public PropostaDTO listarPropostaPorId(Long id) {
        PropostaModel propostaModel = propostaRepository.findById(id)
                .orElseThrow( () -> new PropostaNaoEncontradaException(id));
        return mapper.toDTO(propostaModel);
    }

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void atualizarPropostasExpiradas() {
        propostaRepository.finalizarPropostasExpiradas();
    }


}
