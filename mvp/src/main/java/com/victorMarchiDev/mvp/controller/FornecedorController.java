package com.victorMarchiDev.mvp.controller;

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
    public ResponseEntity<FornecedorModel> criarFornecedor(@RequestBody FornecedorModel fornecedor){
            service.criarFornecedor(fornecedor);
            return ResponseEntity.ok().body(fornecedor);
    }

    @GetMapping("/listar")
    public List<FornecedorModel> listarFornecedores(){
        return service.listarFornecedores();
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarFornecedor(@PathVariable("id") Long id){
        service.deletarFornecedor(id);
        return ResponseEntity.ok("Fornecedor deletado com sucesso!");
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<FornecedorModel> atualizarFornecedor(
            @PathVariable("id") Long id,
            @RequestBody FornecedorModel fornecedorAtualizado){

        FornecedorModel fornecedorAtualizadoSalvo = service.atualizarFornecedor(id, fornecedorAtualizado);
        return ResponseEntity.ok(fornecedorAtualizadoSalvo);
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<FornecedorModel> getFornecedorById(@PathVariable("id") Long id) {
        Optional<FornecedorModel> fornecedorEncontrado = service.getFornecedorById(id);

        return fornecedorEncontrado
                .map(ResponseEntity::ok)                     // se existir, retorna 200 + body
                .orElseGet(() -> ResponseEntity.notFound().build()); // se não existir, retorna 404
    }


}
