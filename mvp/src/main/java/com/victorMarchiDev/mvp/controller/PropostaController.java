package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.dto.PropostaDTO;
import com.victorMarchiDev.mvp.mapper.PropostaMapper;
import com.victorMarchiDev.mvp.model.PropostaModel;
import com.victorMarchiDev.mvp.service.PropostaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/propostas")
public class PropostaController {

    private final PropostaService propostaService;
    private final PropostaMapper mapper;

    public PropostaController(PropostaService propostaService, PropostaMapper mapper) {
        this.propostaService = propostaService;
        this.mapper = mapper;
    }

    @PostMapping("/criar/{id}/")
    public ResponseEntity<PropostaDTO> registrarPropostas(
            @PathVariable("id") Long id,
            @RequestBody PropostaModel propostaModel
    ) {
        PropostaModel proposta = propostaService.criarProposta(id, propostaModel);
        return ResponseEntity.ok().body(mapper.toDTO(proposta));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<PropostaDTO>> listarPropostas() {
        List<PropostaDTO> propostas = propostaService.listarPropostas();
        return ResponseEntity.ok(propostas);
    }

    @GetMapping("/listar/{id}")
    public PropostaDTO listarPropostaPorId(@PathVariable Long id) {
        return propostaService.listarPropostaPorId(id);
    }

}
