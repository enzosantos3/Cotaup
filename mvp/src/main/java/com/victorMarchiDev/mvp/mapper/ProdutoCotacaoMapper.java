package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.ProdutoCotacaoDTO;
import com.victorMarchiDev.mvp.model.ProdutoCotacaoModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProdutoCotacaoMapper {
    ProdutoCotacaoDTO toDto(ProdutoCotacaoModel produtoCotacao);
    ProdutoCotacaoModel toEntity(ProdutoCotacaoDTO dto);
}
