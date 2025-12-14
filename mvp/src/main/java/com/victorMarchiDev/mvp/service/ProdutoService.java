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

    public List<ProdutoDTO> listarProdutos(){
        return repository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    public ProdutoDTO atualizarProduto(Long id, ProdutoDTO produtoAtualizado){
        ProdutoModel produtoExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto nao encontrado com o id: " + id));
        produtoExistente.setNome(produtoAtualizado.nome());
        produtoExistente.setCategoria(produtoAtualizado.categoria());
        produtoExistente.setMarca(produtoAtualizado.marca());
        produtoExistente.setQuantidade(produtoAtualizado.quantidade());
        produtoExistente.setUnidade(produtoAtualizado.unidade());
        produtoExistente.setCodigoEAN(produtoAtualizado.codigoEAN());
        repository.save(produtoExistente);

        return mapper.toDTO(produtoExistente);
    }

    public void deletarProduto(Long id){
        ProdutoModel produto = repository.findById(id)
                .orElseThrow(() -> new ProdutoNaoEncontradoException(id));

        repository.delete(produto);
    }

}
