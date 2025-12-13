package com.victorMarchiDev.mvp.service;


import com.victorMarchiDev.mvp.enums.StatusCotacao;
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

    public CotacaoService(CotacaoRepository repo, PropostaRepository propostaRepo) {
        this.repo = repo;
    }

    public CotacaoModel criarCotacao(CotacaoModel cotacaoModel){
        LocalDate hoje = LocalDate.now(ZoneId.of("America/Sao_Paulo"));
        LocalDate seteDiasDepois = hoje.plusDays(7);
        cotacaoModel.setDataInicio(hoje);
        cotacaoModel.setDataFim(seteDiasDepois);
        cotacaoModel.setStatus(StatusCotacao.ABERTA);
        return repo.save(cotacaoModel);
    }

//    public List<ProdutoModel> listarProdutosPorCotacao(Long id) {
//        return repo.findByIdComProdutos(id)
//                .map(CotacaoModel::getProdutosCotacao)
//                .orElse(Collections.emptyList());
//    }

    public List<CotacaoModel> listarCotacoes() {
        return repo.findAll();
    }

    public CotacaoModel listarCotacaoPorId(Long id){
        return repo.findById(id).orElse(null);
    }


}