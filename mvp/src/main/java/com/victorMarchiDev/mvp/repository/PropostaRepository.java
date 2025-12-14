package com.victorMarchiDev.mvp.repository;

import com.victorMarchiDev.mvp.model.PropostaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PropostaRepository extends JpaRepository<PropostaModel, Long> {
    List<PropostaModel> findByCotacaoId(Long cotacaoId);

    @Query("SELECT p FROM PropostaModel p JOIN FETCH p.cotacao WHERE p.id = :idProposta")
    Optional<PropostaModel> findByIdComProduto(@Param("idProposta") Long idProposta);




}
