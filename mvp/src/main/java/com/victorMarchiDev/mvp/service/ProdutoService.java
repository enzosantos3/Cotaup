package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.dto.ProdutoDTO;
import com.victorMarchiDev.mvp.exception.ProdutoNaoEncontradoException;
import com.victorMarchiDev.mvp.mapper.ProdutoMapper;
import com.victorMarchiDev.mvp.model.FornecedorModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import com.victorMarchiDev.mvp.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;
    private final ProdutoMapper mapper;

    public ProdutoService(ProdutoRepository repository, ProdutoMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public ProdutoDTO criarProduto(ProdutoDTO dto){
        ProdutoModel produto = mapper.toEntity(dto);
        ProdutoModel salvo = repository.save(produto);
        return mapper.toDTO(salvo);
    }

    public ProdutoDTO getProdutoById(Long id){
        ProdutoModel produto = repository.findById(id)
                .orElseThrow(() -> new ProdutoNaoEncontradoException(id));
        return mapper.toDTO(produto);
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
        produtoExistente.setCodigoEAN(produtoAtualizado.getCodigoEAN());
        return repository.save(produtoExistente);
    }

    public Optional<String> deletarProduto(Long id){
        repository.deleteById(id);
        return Optional.ofNullable("Produto deletado com sucesso!");
    }

}
