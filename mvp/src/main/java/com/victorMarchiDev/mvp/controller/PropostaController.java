package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.model.PropostaModel;
import com.victorMarchiDev.mvp.service.PropostaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/propostas")
public class PropostaController {

    private final PropostaService propostaService;

    public PropostaController(PropostaService propostaService) {
        this.propostaService = propostaService;
    }

    @PostMapping("/criar/{id}/")
    public ResponseEntity<String> registrarPropostas(
            @PathVariable("id") Long id,
            @RequestBody List<PropostaModel> propostas
    ) {
        propostaService.registrarPropostas(id, propostas);
        return ResponseEntity.ok("Propostas registradas e cotação finalizada com sucesso!");
    }

    @GetMapping("/listar")
    public ResponseEntity<List<PropostaModel>> listarPropostas (){
        List<PropostaModel> propostas = propostaService.listarPropostas();
        return ResponseEntity.ok(propostas);
    }

//    @GetMapping("/{id}/produtos")
//    public ResponseEntity<Optional<PropostaModel>> listarProdutosPorProposta(@PathVariable("id") Long id) {
//        Optional<PropostaModel> produtos = propostaService.listarProdutoPorProposta(id);
//        if (produtos.isEmpty()) return ResponseEntity.notFound().build();
//        return ResponseEntity.ok(produtos);
//    }


}
