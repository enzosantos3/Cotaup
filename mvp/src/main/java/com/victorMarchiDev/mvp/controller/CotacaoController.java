package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.dto.CotacaoDTO;
import com.victorMarchiDev.mvp.enums.StatusCotacao;
import com.victorMarchiDev.mvp.repository.CotacaoRepository;
import com.victorMarchiDev.mvp.service.CotacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/cotacoes")
public class CotacaoController {

    private final CotacaoService service;
    private final CotacaoRepository cotacaoRepository;
    private final CotacaoService cotacaoService;

    public CotacaoController(CotacaoService service, CotacaoRepository cotacaoRepository, CotacaoService cotacaoService) {
        this.service = service;
        this.cotacaoRepository = cotacaoRepository;
        this.cotacaoService = cotacaoService;
    }

    @PostMapping("/criar")
    public ResponseEntity<Map<String, Long>> criarCotacao(@RequestBody CotacaoDTO cotacao){
        CotacaoDTO cotacaoSalva = service.criarCotacao(cotacao);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("idCotacao", cotacaoSalva.id()));
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
        return cotacaoService.listarCotacoesPorStatus(StatusCotacao.ABERTA);
    }

    @GetMapping("/listar/finalizadas")
    public List<CotacaoDTO> listarFinalizadas() {
        return cotacaoService.listarCotacoesPorStatus(StatusCotacao.FINALIZADA);
    }
}
