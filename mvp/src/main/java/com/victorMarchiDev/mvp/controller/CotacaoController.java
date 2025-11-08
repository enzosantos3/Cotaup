package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.enums.StatusCotacao;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import com.victorMarchiDev.mvp.model.PropostaModel;
import com.victorMarchiDev.mvp.repository.CotacaoRepository;
import com.victorMarchiDev.mvp.service.CotacaoService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/cotacao")
public class CotacaoController {

    private final CotacaoService service;
    private final CotacaoRepository cotacaoRepository;

    public CotacaoController(CotacaoService service, CotacaoRepository cotacaoRepository) {
        this.service = service;
        this.cotacaoRepository = cotacaoRepository;
    }

    @PostMapping
    public ResponseEntity<CotacaoModel> criarCotacao(@RequestBody CotacaoModel cotacaoModel){
        CotacaoModel cotacaoSalva = service.criarCotacao(cotacaoModel);
        return ResponseEntity.ok().body(cotacaoSalva);
    }

    @GetMapping
    public List<CotacaoModel> listarCotacoes(){
        return service.listarCotacoes();
    }

    @GetMapping("/{id}")
    public CotacaoModel listarCotacoesPorId(@PathVariable("id") Long id){
        return service.listarCotacaoPorId(id);
    }

    @GetMapping("/{id}/produtos")
    public ResponseEntity<List<ProdutoModel>> listarProdutosPorCotacao(@PathVariable Long id) {
        List<ProdutoModel> produtos = service.listarProdutosPorCotacao(id);
        if (produtos.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(produtos);
    }

    @PostMapping("/{id}/propostas")
    public ResponseEntity<String> registrarPropostas(
            @PathVariable Long id,
            @RequestBody List<PropostaModel> propostas
    ) {
        service.registrarPropostas(id, propostas);
        return ResponseEntity.ok("Propostas registradas e cotação finalizada com sucesso!");
    }
  
    @GetMapping("/{id}/propostas")
    public ResponseEntity<List<PropostaModel>> listarPropostas (@PathVariable Long id){
        List<PropostaModel> propostas = service.listarPropostasPorCotacao(id);
        return ResponseEntity.ok(propostas);
    }

    @GetMapping("/abertas")
    public List<CotacaoModel> listarAbertas(){
        return cotacaoRepository.findByStatus(StatusCotacao.ABERTA);
    }

    @GetMapping("/finalizadas")
    public ResponseEntity<List<CotacaoModel>> listarFinalizadas() {
        List<CotacaoModel> cotacoes = cotacaoRepository.findByStatus(StatusCotacao.FINALIZADA);
        return ResponseEntity.ok(cotacoes);
    }
}
