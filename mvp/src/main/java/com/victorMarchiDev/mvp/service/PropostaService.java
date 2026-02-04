package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.dto.PropostaDTO;
import com.victorMarchiDev.mvp.enums.StatusCotacao;
import com.victorMarchiDev.mvp.enums.StatusProposta;
import com.victorMarchiDev.mvp.exception.CotacaoNaoEncontradaException;
import com.victorMarchiDev.mvp.exception.PropostaNaoEncontradaException;
import com.victorMarchiDev.mvp.mapper.PropostaMapper;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.ProdutoCotacaoModel;
import com.victorMarchiDev.mvp.model.PropostaModel;
import com.victorMarchiDev.mvp.repository.CotacaoRepository;
import com.victorMarchiDev.mvp.repository.ProdutoCotacaoRepository;
import com.victorMarchiDev.mvp.repository.PropostaRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
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

    @Transactional
    public PropostaModel criarProposta(Long cotacaoId, PropostaModel proposta) {

        CotacaoModel cotacao = cotacaoRepository.findById(cotacaoId)
                .orElseThrow(() -> new RuntimeException("Cotação não encontrada"));

        proposta.setCotacao(cotacao);
        proposta.setStatus(StatusProposta.CRIADA);
        proposta.setDataCriacao(LocalDate.now());

        PropostaModel salva = propostaRepository.save(proposta);

        List<ProdutoCotacaoModel> itens =
                produtoCotacaoRepository.findByCotacaoId(cotacaoId);

        itens.forEach(item -> item.setProposta(salva));
        produtoCotacaoRepository.saveAll(itens);

        cotacao.setStatus(StatusCotacao.FINALIZADA);
        cotacaoRepository.save(cotacao);

        return salva;
    }

    public List<PropostaDTO> listarPropostas() {
        return propostaRepository.findAll()
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
