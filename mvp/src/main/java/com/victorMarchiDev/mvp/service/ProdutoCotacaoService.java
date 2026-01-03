package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.dto.ProdutoCotacaoDTO;
import com.victorMarchiDev.mvp.exception.CotacaoNaoEncontradaException;
import com.victorMarchiDev.mvp.mapper.ProdutoCotacaoMapper;
import com.victorMarchiDev.mvp.model.ProdutoCotacaoModel;
import com.victorMarchiDev.mvp.repository.ProdutoCotacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoCotacaoService {

    private final ProdutoCotacaoRepository repository;
    private final ProdutoCotacaoMapper mapper;

    public ProdutoCotacaoService(ProdutoCotacaoRepository repository, ProdutoCotacaoMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<ProdutoCotacaoDTO> listarProdutosCotacao(Long idCotacao){
        List<ProdutoCotacaoModel> itens = repository.findByCotacaoId(idCotacao);

        if(itens.isEmpty()) {
            throw new CotacaoNaoEncontradaException(idCotacao);
        }

        return itens
                    .stream()
                    .map(mapper::toDto)
                    .toList();

    }
}
