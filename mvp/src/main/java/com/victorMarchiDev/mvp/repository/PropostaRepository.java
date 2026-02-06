package com.victorMarchiDev.mvp.repository;

import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.PropostaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PropostaRepository extends JpaRepository<PropostaModel, Long> {
    List<PropostaModel> findByCotacaoId(Long cotacaoId);

    @Query("""
    SELECT DISTINCT p
    FROM PropostaModel p
    LEFT JOIN FETCH p.produtos pc
    LEFT JOIN FETCH pc.produto
    """)
    List<PropostaModel> findAllComProdutos();

    @Modifying
    @Query("""
    UPDATE PropostaModel p 
    SET p.status = 'EXPIRADA'
    WHERE p.dataFim < CURRENT_DATE
    AND p.status <> 'EXPIRADA'
    """)
    void finalizarPropostasExpiradas();

}
