package com.victorMarchiDev.mvp.service;


import com.victorMarchiDev.mvp.dto.CotacaoDTO;
import com.victorMarchiDev.mvp.enums.StatusCotacao;
import com.victorMarchiDev.mvp.exception.CotacaoNaoEncontradaException;
import com.victorMarchiDev.mvp.mapper.CotacaoMapper;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.ProdutoCotacaoModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import com.victorMarchiDev.mvp.model.PropostaModel;
import com.victorMarchiDev.mvp.repository.CotacaoRepository;
import com.victorMarchiDev.mvp.repository.PropostaRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class CotacaoService {

    private final CotacaoRepository repo;
    private final CotacaoMapper mapper;

    public CotacaoService(CotacaoRepository repo, PropostaRepository propostaRepo, CotacaoMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Transactional
    public CotacaoDTO criarCotacao(CotacaoDTO dto){
        CotacaoModel cotacao = mapper.toEntity(dto);

        cotacao.setDataInicio(dto.dataInicio());
        cotacao.setDataFim(dto.dataFim());
        cotacao.setStatus(StatusCotacao.ABERTA);


        for (ProdutoCotacaoModel pc : cotacao.getProdutos()) {
            pc.setCotacao(cotacao);
            BigDecimal valorTotal =
                    pc.getValorUnitario()
                            .multiply(BigDecimal.valueOf(pc.getQuantidade()));

            pc.setValorTotal(valorTotal);
        }

        CotacaoModel salva = repo.save(cotacao);

        return mapper.toDTO(salva);
    }


    public List<CotacaoDTO> listarCotacoes() {
        return repo.findAllComProdutos()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    public CotacaoDTO listarCotacaoPorId(Long id){
        CotacaoModel cotacao = repo.findById(id)
                .orElseThrow( () -> new CotacaoNaoEncontradaException(id));
        return mapper.toDTO(cotacao);
    }

    public List<CotacaoDTO> listarCotacoesPorStatus(StatusCotacao status){
        return repo.findByStatus(status)
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void atualizarCotacoesExpiradas() {
        repo.finalizarCotacoesExpiradas();
    }


}