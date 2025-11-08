package com.victorMarchiDev.mvp.repository;

import com.victorMarchiDev.mvp.enums.StatusCotacao;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CotacaoRepository extends JpaRepository<CotacaoModel, Long> {
    List<CotacaoModel> findByStatus(StatusCotacao status);
}
