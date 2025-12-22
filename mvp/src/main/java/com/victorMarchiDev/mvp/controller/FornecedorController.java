package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.dto.FornecedorDTO;
import com.victorMarchiDev.mvp.model.FornecedorModel;
import com.victorMarchiDev.mvp.service.FornecedorService;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/listar")
    public List<FornecedorDTO> listarFornecedores(){
        return service.listarFornecedores();
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarFornecedor(@PathVariable("id") Long id){
        service.deletarFornecedor(id);
        return ResponseEntity.ok("Fornecedor deletado com sucesso!");
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<FornecedorDTO> getFornecedorById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getFornecedorById(id));
    }


}
