package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.service.CotacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/cotacao")
public class CotacaoController {

    private final CotacaoService service;

    public CotacaoController(CotacaoService service) {
        this.service = service;
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
}
