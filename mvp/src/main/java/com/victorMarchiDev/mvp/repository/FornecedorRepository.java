package com.victorMarchiDev.mvp.repository;

import com.victorMarchiDev.mvp.model.FornecedorModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FornecedorRepository extends JpaRepository<FornecedorModel, Long> {
    Optional<FornecedorModel> findByUsuarioId(Long usuarioId);
}
