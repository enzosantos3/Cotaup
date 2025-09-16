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

}
