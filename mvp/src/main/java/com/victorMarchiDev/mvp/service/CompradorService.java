package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.dto.CompradorDTO;
import com.victorMarchiDev.mvp.exception.CompradorNaoEncontradoException;
import com.victorMarchiDev.mvp.mapper.CompradorMapper;
import com.victorMarchiDev.mvp.model.CompradorModel;
import com.victorMarchiDev.mvp.repository.CompradorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompradorService {

    private final CompradorRepository repository;
    private final CompradorMapper mapper;

    public CompradorService(CompradorRepository repository, CompradorMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public CompradorDTO criarComprador(CompradorDTO dto){
        CompradorModel Comprador = mapper.toEntity(dto);
        return mapper.toDto(repository.save(Comprador));
    }

    public List<CompradorDTO> listarCompradores(){
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    public void deletarComprador(Long id){
        repository.deleteById(id);
    }

    public CompradorDTO atualizarComprador(Long id, CompradorDTO CompradorExistente){
        CompradorModel CompradorAtualizado = repository.findById(id)
                .orElseThrow(() -> new CompradorNaoEncontradoException(id));
        repository.save(CompradorAtualizado);

        return mapper.toDto(CompradorAtualizado);
    }

    public CompradorDTO getCompradorById(Long id){
        CompradorModel Comprador = repository.findById(id)
                .orElseThrow(() -> new CompradorNaoEncontradoException(id));
        return mapper.toDto(Comprador);
    }

}

