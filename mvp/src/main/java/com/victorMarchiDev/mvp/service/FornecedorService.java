package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.model.FornecedorModel;
import com.victorMarchiDev.mvp.repository.FornecedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FornecedorService {

    private final FornecedorRepository repository;
    public FornecedorService(FornecedorRepository repository) {
        this.repository = repository;
    }

    public FornecedorModel criarFornecedor(FornecedorModel fornecedor){
        return repository.save(fornecedor);
    }

    public List<FornecedorModel> listarFornecedores(){
        return repository.findAll();
    }

    public void deletarFornecedor(Long id){
        repository.deleteById(id);
    }

    public FornecedorModel atualizarFornecedor(Long id, FornecedorModel fornecedorAtualizado){
        FornecedorModel fornecedorExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor nao foi encontrado com o id: " + id));
        fornecedorExistente.setCnpj(fornecedorAtualizado.getCnpj());
        fornecedorExistente.setEmail(fornecedorAtualizado.getEmail());
        fornecedorExistente.setEndereco(fornecedorAtualizado.getEndereco());
        fornecedorExistente.setNomeFantasia(fornecedorAtualizado.getNomeFantasia());
        fornecedorExistente.setRazaoSocial(fornecedorAtualizado.getRazaoSocial());
        fornecedorExistente.setTelefone(fornecedorAtualizado.getTelefone());
        fornecedorExistente.setRepresentante(fornecedorAtualizado.getRepresentante());
        fornecedorExistente.setInscricaoEstadual(fornecedorAtualizado.getInscricaoEstadual());

        return repository.save(fornecedorExistente);
    }

}
