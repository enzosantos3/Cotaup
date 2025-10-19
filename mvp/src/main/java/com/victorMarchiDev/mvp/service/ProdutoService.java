package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.model.FornecedorModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import com.victorMarchiDev.mvp.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public ProdutoModel criarProduto(ProdutoModel produtoModel){
        return repository.save(produtoModel);
    }

    public Optional<ProdutoModel> getProdutoById(Long id){
        Optional<ProdutoModel> produtoEncontrado = repository.findById(id);
        return produtoEncontrado;
    }

    public List<ProdutoModel> listarProdutos(){
        return repository.findAll();
    }

    public ProdutoModel atualizarProduto(Long id, ProdutoModel produtoAtualizado){
        ProdutoModel produtoExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto nao encontrado com o id: " + id));
        produtoExistente.setNome(produtoAtualizado.getNome());
        produtoExistente.setCategoria(produtoAtualizado.getCategoria());
        produtoExistente.setMarca(produtoAtualizado.getMarca());
        produtoExistente.setQuantidade(produtoAtualizado.getQuantidade());
        produtoExistente.setUnidade(produtoAtualizado.getUnidade());
        return repository.save(produtoExistente);
    }

    public Optional<String> deletarProduto(Long id){
        repository.deleteById(id);
        return Optional.ofNullable("Produto deletado com sucesso!");
    }

}
