package com.victorMarchiDev.mvp.security;

import com.victorMarchiDev.mvp.model.UsuarioModel;
import com.victorMarchiDev.mvp.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioDetailsService implements UserDetailsService {

    private final UsuarioRepository repository;

    public UsuarioDetailsService(UsuarioRepository repository) {
        this.repository = repository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) {
        UsuarioModel user = repository.findByEmail(email)
                .orElseThrow( () -> new UsernameNotFoundException("Usuário não encontrado"));

        return User.builder()
                .username(user.getEmail())
                .password(user.getSenha())
                .roles(user.getRole().name())
                .build();
    }
}
