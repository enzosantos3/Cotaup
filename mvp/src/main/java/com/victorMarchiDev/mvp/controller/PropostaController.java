package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.dto.PropostaDTO;
import com.victorMarchiDev.mvp.mapper.PropostaMapper;
import com.victorMarchiDev.mvp.model.PropostaModel;
import com.victorMarchiDev.mvp.service.PropostaService;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/criar/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public PropostaDTO registrarPropostas(
            @PathVariable("id") Long id,
            @RequestBody PropostaDTO propostaDTO
    ) {
        PropostaDTO proposta = propostaService.criarProposta(id, propostaDTO);
        return proposta;
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

    @GetMapping("/listar/cotacao/{idCotacao}")
    public List<PropostaDTO> listarPropostasPorCotacao(@PathVariable Long idCotacao){
        return propostaService.listarPropostasPorCotacao(idCotacao);
    }
}
