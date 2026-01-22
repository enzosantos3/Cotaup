package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.dto.FornecedorDTO;
import com.victorMarchiDev.mvp.model.FornecedorModel;
import com.victorMarchiDev.mvp.service.FornecedorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/fornecedores")
public class FornecedorController {

    private final FornecedorService service;
    public FornecedorController(FornecedorService service) {
        this.service = service;
    }

    @PostMapping("/criar")
    public ResponseEntity<FornecedorDTO> criarFornecedor(@RequestBody FornecedorDTO fornecedor){
            FornecedorDTO fornecedorCriado = service.criarFornecedor(fornecedor);
            return ResponseEntity.ok().body(fornecedorCriado);
    }

    @PreAuthorize("hasRole('FORNECEDOR')")
    @GetMapping("/listar")
    public List<FornecedorDTO> listarFornecedores(){
        return service.listarFornecedores();
    }

    @GetMapping("/ping")
    public ResponseEntity<?> listar() {

        var auth = SecurityContextHolder
                .getContext()
                .getAuthentication();

        System.out.println("AUTH = " + auth);
        System.out.println("AUTHORITIES = " + auth.getAuthorities());

        return ResponseEntity.ok("PONG");
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarFornecedor(@PathVariable("id") Long id){
        service.deletarFornecedor(id);
        return ResponseEntity.ok("Fornecedor deletado com sucesso!");
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<FornecedorDTO> atualizarFornecedor(
            @PathVariable("id") Long id,
            @RequestBody FornecedorDTO fornecedorAtualizado){

        FornecedorDTO fornecedorAtualizadoSalvo = service.atualizarFornecedor(id, fornecedorAtualizado);
        return ResponseEntity.ok(fornecedorAtualizadoSalvo);
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<FornecedorDTO> getFornecedorById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getFornecedorById(id));
    }


}
