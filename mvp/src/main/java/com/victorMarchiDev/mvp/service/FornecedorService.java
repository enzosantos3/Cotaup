package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.dto.FornecedorDTO;
import com.victorMarchiDev.mvp.exception.FornecedorNaoEncontradoException;
import com.victorMarchiDev.mvp.mapper.FornecedorMapper;
import com.victorMarchiDev.mvp.model.FornecedorModel;
import com.victorMarchiDev.mvp.repository.FornecedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FornecedorService {

    private final FornecedorRepository repository;
    private final FornecedorMapper mapper;

    public FornecedorService(FornecedorRepository repository, FornecedorMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public FornecedorDTO criarFornecedor(FornecedorDTO dto){
        FornecedorModel fornecedor = mapper.toEntity(dto);
        return mapper.toDto(repository.save(fornecedor));
    }

    public List<FornecedorDTO> listarFornecedores(){
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    public void deletarFornecedor(Long id){
        repository.deleteById(id);
    }

    public FornecedorDTO atualizarFornecedor(Long id, FornecedorDTO fornecedorExistente){
        FornecedorModel fornecedorAtualizado = repository.findById(id)
                        .orElseThrow(() -> new FornecedorNaoEncontradoException(id));
        fornecedorAtualizado.setCnpj(fornecedorExistente.cnpj());
        fornecedorAtualizado.setEmail(fornecedorExistente.email());
        fornecedorAtualizado.setEndereco(fornecedorExistente.endereco());
        fornecedorAtualizado.setNomeFantasia(fornecedorExistente.nomeFantasia());
        fornecedorAtualizado.setRazaoSocial(fornecedorExistente.razaoSocial());
        fornecedorAtualizado.setTelefone(fornecedorExistente.telefone());
        fornecedorAtualizado.setRepresentante(fornecedorExistente.representante());
        fornecedorAtualizado.setInscricaoEstadual(fornecedorExistente.inscricaoEstadual());

        repository.save(fornecedorAtualizado);

        return mapper.toDto(fornecedorAtualizado);
    }

    public FornecedorDTO getFornecedorById(Long id){
        FornecedorModel fornecedor = repository.findById(id)
                .orElseThrow(() -> new FornecedorNaoEncontradoException(id));
        return mapper.toDto(fornecedor);
    }

}
