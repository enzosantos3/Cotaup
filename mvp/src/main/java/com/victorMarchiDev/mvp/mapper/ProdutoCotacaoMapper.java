package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.ProdutoCotacaoDTO;
import com.victorMarchiDev.mvp.model.ProdutoCotacaoModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProdutoCotacaoMapper {

    @Mapping(target = "cotacaoId", source = "cotacao.id")
    @Mapping(target = "produtoId", source = "produto.id")
    @Mapping(target = "nomeProduto", source = "produto.nome")
    @Mapping(target = "propostaId", source = "proposta.id")
    ProdutoCotacaoDTO toDto(ProdutoCotacaoModel model);

    @Mapping(target = "cotacao", ignore = true)
    @Mapping(target = "produto", ignore = true)
    @Mapping(target = "proposta", ignore = true)
    @Mapping(target = "valorTotal", ignore = true)
    ProdutoCotacaoModel toEntity(ProdutoCotacaoDTO dto);
}
