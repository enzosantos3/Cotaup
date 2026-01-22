package com.victorMarchiDev.mvp.security;

import com.victorMarchiDev.mvp.dto.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public LoginService(AuthenticationManager authManager, JwtService jwtService) {
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    public String login(LoginRequest dto){
        var auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.email(),
                        dto.senha()
                )
        );

        return jwtService.gerarToken(
                (UserDetails) auth.getPrincipal()
        );
    }
}
