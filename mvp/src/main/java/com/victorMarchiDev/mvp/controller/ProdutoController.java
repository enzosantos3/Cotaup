package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.model.FornecedorModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import com.victorMarchiDev.mvp.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping("/criar")
    public ResponseEntity<ProdutoModel> criarProduto(@RequestBody ProdutoModel produtoModel) {
        produtoService.criarProduto(produtoModel);
        return ResponseEntity.ok().body(produtoModel);
    }

    @GetMapping("/listar")
    public List<ProdutoModel> getProdutos(){
        return produtoService.listarProdutos();
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<ProdutoModel> atualizarProduto(
            @PathVariable("id") Long id,
            @RequestBody ProdutoModel produtoAtualizado){

        ProdutoModel produtoAtualizadoSalvo = produtoService.atualizarProduto(id, produtoAtualizado);
        return ResponseEntity.ok(produtoAtualizadoSalvo);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarProduto(@PathVariable("id") Long id){
        produtoService.deletarProduto(id);
        return ResponseEntity.ok().body("Produto deletado com sucesso");
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<ProdutoModel> getProdutoById(@PathVariable("id") Long id) {
        Optional<ProdutoModel> produtoEncontrado = produtoService.getProdutoById(id);

        return produtoEncontrado
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
