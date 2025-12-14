package com.victorMarchiDev.mvp.repository;


import com.victorMarchiDev.mvp.model.ProdutoCotacaoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoCotacaoRepository extends JpaRepository<ProdutoCotacaoModel, Long> {
    List<ProdutoCotacaoModel> findByCotacaoId(Long cotacaoId);
}
