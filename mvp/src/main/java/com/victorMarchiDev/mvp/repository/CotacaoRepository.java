package com.victorMarchiDev.mvp.repository;

import com.victorMarchiDev.mvp.enums.StatusCotacao;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CotacaoRepository extends JpaRepository<CotacaoModel, Long> {
    List<CotacaoModel> findByStatus(StatusCotacao status);

    @Query("SELECT c FROM CotacaoModel c JOIN FETCH c.produtosCotacao WHERE c.id = :id")
    Optional<CotacaoModel> findByIdComProdutos(@Param("id") Long id);

}
