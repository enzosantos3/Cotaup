package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.CotacaoDTO;
import com.victorMarchiDev.mvp.dto.PropostaDTO;
import com.victorMarchiDev.mvp.model.CotacaoModel;
import com.victorMarchiDev.mvp.model.PropostaModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring",
        uses = ProdutoPropostaMapper.class
)
public interface PropostaMapper {
    PropostaModel toEntity(PropostaDTO dto);

    @Mapping(target = "cotacaoId", source = "cotacao.id")
    PropostaDTO toDTO(PropostaModel proposta);
}
