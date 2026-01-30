package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.mapper.UsuarioMapper;
import com.victorMarchiDev.mvp.model.CompradorModel;
import com.victorMarchiDev.mvp.model.FornecedorModel;
import com.victorMarchiDev.mvp.model.UsuarioModel;
import com.victorMarchiDev.mvp.repository.CompradorRepository;
import com.victorMarchiDev.mvp.repository.EmpresaRepository;
import com.victorMarchiDev.mvp.repository.FornecedorRepository;
import com.victorMarchiDev.mvp.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final EmpresaRepository empresaRepository;
    private final FornecedorRepository fornecedorRepository;
    private final CompradorRepository compradorRepository;
    private final UsuarioMapper usuarioMapper;

    public UsuarioModel criarUsuarioPorRole(UsuarioModel usuario){
        UsuarioModel usuarioSalvo = usuarioRepository.save(usuario);

        switch (usuarioSalvo.getRole()){
            case FORNECEDOR -> {
                FornecedorModel fornecedorModel = new FornecedorModel();
                fornecedorModel.setUsuario(usuarioSalvo);
                fornecedorRepository.save(fornecedorModel);
            }

            case COMPRADOR -> {
                CompradorModel compradorModel = new CompradorModel();
                compradorModel.setUsuario(usuarioSalvo);
                compradorRepository.save(compradorModel);
            }
        }

        return usuarioSalvo;
    }

}
