package com.victorMarchiDev.mvp.security;

import com.victorMarchiDev.mvp.dto.RegisterRequest;
import com.victorMarchiDev.mvp.exception.EmailCadastradoException;
import com.victorMarchiDev.mvp.model.UsuarioModel;
import com.victorMarchiDev.mvp.service.UsuarioService;
import com.victorMarchiDev.mvp.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository repository;
    private final PasswordEncoder encoder;
    private final UsuarioService usuarioService;

    public AuthService(UsuarioRepository repository, PasswordEncoder encoder, UsuarioService usuarioService) {
        this.repository = repository;
        this.encoder = encoder;
        this.usuarioService = usuarioService;
    }

    public void registrar(RegisterRequest dto){
        if(repository.findByEmail(dto.email()).isPresent())
            throw new EmailCadastradoException();

        UsuarioModel user = new UsuarioModel();
        user.setEmail(dto.email());
        user.setSenha(encoder.encode(dto.senha()));
        user.setRole(dto.role());
        usuarioService.criarUsuarioPorRole(user);
        repository.save(user);


    }

}
