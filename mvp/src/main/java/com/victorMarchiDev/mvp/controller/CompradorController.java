package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.dto.CompradorDTO;
import com.victorMarchiDev.mvp.service.CompradorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/compradores")
public class CompradorController {

    private final CompradorService service;
    public CompradorController(CompradorService service) {
        this.service = service;
    }

    @PostMapping("/criar")
    public ResponseEntity<CompradorDTO> criarComprador(@RequestBody CompradorDTO Comprador){
        CompradorDTO CompradorCriado = service.criarComprador(Comprador);
        return ResponseEntity.ok().body(CompradorCriado);
    }

    @GetMapping("/listar")
    public List<CompradorDTO> listarCompradores(){
        return service.listarCompradores();
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarComprador(@PathVariable("id") Long id){
        service.deletarComprador(id);
        return ResponseEntity.ok("Comprador deletado com sucesso!");
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<CompradorDTO> atualizarComprador(
            @PathVariable("id") Long id,
            @RequestBody CompradorDTO CompradorAtualizado){

        CompradorDTO CompradorAtualizadoSalvo = service.atualizarComprador(id, CompradorAtualizado);
        return ResponseEntity.ok(CompradorAtualizadoSalvo);
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<CompradorDTO> getCompradorById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getCompradorById(id));
    }


}