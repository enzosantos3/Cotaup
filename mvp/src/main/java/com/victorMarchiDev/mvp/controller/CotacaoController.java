package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.dto.CotacaoDTO;
import com.victorMarchiDev.mvp.enums.StatusCotacao;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import com.victorMarchiDev.mvp.model.PropostaModel;
import com.victorMarchiDev.mvp.repository.CotacaoRepository;
import com.victorMarchiDev.mvp.service.CotacaoService;
import com.victorMarchiDev.mvp.service.PropostaService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/cotacoes")
public class CotacaoController {

    private final CotacaoService service;
    private final CotacaoRepository cotacaoRepository;

    public CotacaoController(CotacaoService service, CotacaoRepository cotacaoRepository) {
        this.service = service;
        this.cotacaoRepository = cotacaoRepository;
    }

    @PostMapping("/criar")
    public ResponseEntity<CotacaoDTO> criarCotacao(@RequestBody CotacaoDTO cotacao){
        CotacaoDTO cotacaoSalva = service.criarCotacao(cotacao);
        return ResponseEntity.ok().body(cotacaoSalva);
    }

    @GetMapping("/listar")
    public List<CotacaoDTO> listarCotacoes(){
        return service.listarCotacoes();
    }

    @GetMapping("/listar/{id}")
    public CotacaoDTO listarCotacoesPorId(@PathVariable("id") Long id){
        return service.listarCotacaoPorId(id);
    }

    @GetMapping("/listar/abertas")
    public List<CotacaoDTO> listarAbertas(){
        return cotacaoRepository.findByStatus(StatusCotacao.ABERTA);
    }

    @GetMapping("/listar/finalizadas")
    public ResponseEntity<List<CotacaoDTO>> listarFinalizadas() {
        List<CotacaoDTO> cotacoes = cotacaoRepository.findByStatus(StatusCotacao.FINALIZADA);
        return ResponseEntity.ok(cotacoes);
    }
}
