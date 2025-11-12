package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.enums.StatusCotacao;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.CotacaoProdutoModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import com.victorMarchiDev.mvp.model.PropostaModel;
import com.victorMarchiDev.mvp.repository.CotacaoRepository;
import com.victorMarchiDev.mvp.repository.PropostaRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class PropostaService {

    private final CotacaoRepository repo;
    private final PropostaRepository propostaRepo;

    public PropostaService(CotacaoRepository repo, PropostaRepository propostaRepo) {
        this.repo = repo;
        this.propostaRepo = propostaRepo;
    }

    public void registrarPropostas(Long cotacaoId, List<PropostaModel> propostasRecebidas){
        CotacaoModel cotacao = repo.findById(cotacaoId)
                .orElseThrow(() -> new RuntimeException("Cotação Não Encontrada!"));

        for (PropostaModel proposta : propostasRecebidas) {
            proposta.setCotacao(cotacao);
            propostaRepo.save(proposta);
        }

        cotacao.setStatus(StatusCotacao.FINALIZADA);
        repo.save(cotacao);
    }

    public List<PropostaModel> listarPropostasPorCotacao(Long cotacaoId) {
        return propostaRepo.findByCotacaoId(cotacaoId);
    }

    public List<CotacaoProdutoModel> listarProdutosPorPropostas(Long idProposta) {
        return propostaRepo.findProdutosByPropostaId(idProposta);
    }

    public List<PropostaModel> listarPropostas(Long id){
        return propostaRepo.findAll();
    }
}
