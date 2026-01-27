package com.victorMarchiDev.mvp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.victorMarchiDev.mvp.enums.StatusCotacao;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDate;
import java.util.List;

public record CotacaoDTO(
         Long id,
         String name,
         LocalDate dataInicio,
         LocalDate dataFim,
         StatusCotacao status,
         String observacoes,
         List<ProdutoCotacaoDTO> produtos
) {}
