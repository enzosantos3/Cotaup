package com.victorMarchiDev.mvp.repository;

import com.victorMarchiDev.mvp.model.ProdutoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<ProdutoModel, Long> {
}
