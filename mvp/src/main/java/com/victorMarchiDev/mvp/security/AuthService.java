package com.victorMarchiDev.mvp.security;

import com.victorMarchiDev.mvp.dto.RegisterRequest;
import com.victorMarchiDev.mvp.model.UsuarioModel;
import com.victorMarchiDev.mvp.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository repository;
    private final PasswordEncoder encoder;

    public AuthService(UsuarioRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public void registrar(RegisterRequest dto){
        if(repository.findByEmail(dto.email()).isPresent())
            throw new RuntimeException("Email já cadastrado");

        UsuarioModel user = new UsuarioModel();
        user.setEmail(dto.email());
        user.setSenha(encoder.encode(dto.senha()));
        user.setRole(dto.role());

        repository.save(user);
    }

}
