package com.victorMarchiDev.mvp.repository;

import com.victorMarchiDev.mvp.model.PropostaModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropostaRepository extends JpaRepository<PropostaModel, Long> {
    List<PropostaModel> findByCotacaoId(Long cotacaoId);
}
