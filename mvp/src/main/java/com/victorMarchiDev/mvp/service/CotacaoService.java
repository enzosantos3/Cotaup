package com.victorMarchiDev.mvp.service;


import com.victorMarchiDev.mvp.dto.CotacaoDTO;
import com.victorMarchiDev.mvp.enums.StatusCotacao;
import com.victorMarchiDev.mvp.exception.CotacaoNaoEncontradaException;
import com.victorMarchiDev.mvp.mapper.CotacaoMapper;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import com.victorMarchiDev.mvp.model.PropostaModel;
import com.victorMarchiDev.mvp.repository.CotacaoRepository;
import com.victorMarchiDev.mvp.repository.PropostaRepository;
import org.springframework.stereotype.Service;

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

    public CotacaoDTO criarCotacao(CotacaoDTO dto){
        LocalDate hoje = LocalDate.now(ZoneId.of("America/Sao_Paulo"));
        LocalDate seteDiasDepois = hoje.plusDays(7);
        CotacaoModel cotacao = mapper.toEntity(dto);

        cotacao.setDataInicio(hoje);
        cotacao.setDataFim(seteDiasDepois);
        cotacao.setStatus(StatusCotacao.ABERTA);

        CotacaoModel salva = repo.save(cotacao);

        return mapper.toDTO(salva);
    }


    public List<CotacaoDTO> listarCotacoes() {
        return repo.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    public CotacaoDTO listarCotacaoPorId(Long id){
        CotacaoModel cotacao = repo.findById(id)
                .orElseThrow( () -> new CotacaoNaoEncontradaException(id));
        return mapper.toDTO(cotacao);
    }


}