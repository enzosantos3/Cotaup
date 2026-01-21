package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.CotacaoDTO;
import com.victorMarchiDev.mvp.dto.PropostaDTO;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.PropostaModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PropostaMapper {
    PropostaModel toEntity(PropostaDTO dto);
    PropostaDTO toDTO(PropostaModel proposta);
}
