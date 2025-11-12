package com.victorMarchiDev.mvp.repository;

import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.CotacaoProdutoModel;
import com.victorMarchiDev.mvp.model.PropostaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PropostaRepository extends JpaRepository<PropostaModel, Long> {
    List<PropostaModel> findByCotacaoId(Long cotacaoId);

    @Query("""
    SELECT cp 
    FROM CotacaoProdutoModel cp 
    JOIN cp.cotacao c 
    JOIN PropostaModel p ON p.cotacao.id = c.id 
    WHERE p.id = :idProposta
    """)
    List<CotacaoProdutoModel> findProdutosByPropostaId(@Param("idProposta") Long idProposta);

}
