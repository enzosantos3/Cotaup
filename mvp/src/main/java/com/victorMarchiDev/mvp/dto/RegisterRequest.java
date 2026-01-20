package com.victorMarchiDev.mvp.dto;

import com.victorMarchiDev.mvp.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
        @Email String email,
        @NotBlank String senha,
        Role role
) {}
