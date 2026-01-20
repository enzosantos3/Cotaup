package com.victorMarchiDev.mvp.service;

import com.victorMarchiDev.mvp.dto.LoginRequest;
import org.apache.catalina.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final AuthenticationManager authManager;

    public LoginService(AuthenticationManager authManager) {
        this.authManager = authManager;
    }

    public void login(LoginRequest dto){
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.email(), dto.senha())
        );
    }
}
