package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.CotacaoDTO;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring",
uses = ProdutoCotacaoMapper.class
)
public interface CotacaoMapper {
    CotacaoModel toEntity(CotacaoDTO dto);

    CotacaoDTO toDTO(CotacaoModel cotacao);
}
