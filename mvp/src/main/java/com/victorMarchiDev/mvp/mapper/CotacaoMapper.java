package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.CotacaoDTO;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CotacaoMapper {
    CotacaoModel toEntity(CotacaoDTO dto);
    CotacaoDTO toDTO(CotacaoModel cotacao);
}
