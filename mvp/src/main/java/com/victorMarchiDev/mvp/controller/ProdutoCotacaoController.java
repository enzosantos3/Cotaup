package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.dto.ProdutoCotacaoDTO;
import com.victorMarchiDev.mvp.service.ProdutoCotacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos-cotacao")
public class ProdutoCotacaoController {

    private final ProdutoCotacaoService service;

    public ProdutoCotacaoController(ProdutoCotacaoService service) {
        this.service = service;
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<List<ProdutoCotacaoDTO>> listarProdutosPorCotacao(
            @PathVariable("id") Long idCotacao){
        return ResponseEntity.ok(service.listarProdutosCotacao(idCotacao));
    }
}
