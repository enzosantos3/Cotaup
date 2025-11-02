package com.victorMarchiDev.mvp.service;


import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.repository.CotacaoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class CotacaoService {

    private final CotacaoRepository repo;

    public CotacaoService(CotacaoRepository repo) {
        this.repo = repo;
    }

    public CotacaoModel criarCotacao(CotacaoModel cotacaoModel){
        LocalDate hoje = LocalDate.now();

        LocalDate seteDiasDepois = hoje.plusDays(7);

        cotacaoModel.setDataInicio(hoje);
        cotacaoModel.setDataFim(seteDiasDepois);

        return repo.save(cotacaoModel);
    }

    public List<CotacaoModel> listarCotacoes() {
        return repo.findAll();
    }

    public CotacaoModel listarCotacaoPorId(Long id){
        return repo.findById(id).orElse(null);
    }

}