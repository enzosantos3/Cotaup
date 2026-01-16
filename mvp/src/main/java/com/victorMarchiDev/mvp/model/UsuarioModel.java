package com.victorMarchiDev.mvp.model;

import com.victorMarchiDev.mvp.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioModel {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String senha;

    @Enumerated(EnumType.STRING)
    private Role role;
}
