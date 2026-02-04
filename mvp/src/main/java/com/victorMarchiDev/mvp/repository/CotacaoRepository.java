package com.victorMarchiDev.mvp.repository;

import com.victorMarchiDev.mvp.dto.CotacaoDTO;
import com.victorMarchiDev.mvp.enums.StatusCotacao;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CotacaoRepository extends JpaRepository<CotacaoModel, Long> {
    List<CotacaoModel> findByStatus(StatusCotacao status);

    @Query("""
    SELECT DISTINCT c
    FROM CotacaoModel c
    LEFT JOIN FETCH c.produtos pc
    LEFT JOIN FETCH pc.produto
    """)
    List<CotacaoModel> findAllComProdutos();


    @Modifying
    @Query("""
    UPDATE CotacaoModel c 
    SET c.status = 'FINALIZADA'
    WHERE c.dataFim < CURRENT_DATE
    AND c.status <> 'FINALIZADA'
    """)
    void finalizarCotacoesExpiradas();

}
