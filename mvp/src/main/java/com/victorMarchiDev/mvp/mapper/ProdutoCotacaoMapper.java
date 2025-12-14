package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.ProdutoCotacaoDTO;
import com.victorMarchiDev.mvp.model.ProdutoCotacaoModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProdutoCotacaoMapper {

    @Mapping(source = "produto.id", target = "id")
    @Mapping(source = "produto.nome", target = "nomeProduto")
    @Mapping(source = "produto.marca", target = "marca")
    ProdutoCotacaoDTO toDto(ProdutoCotacaoModel produtoCotacao);

    ProdutoCotacaoModel toEntity(ProdutoCotacaoDTO dto);
}
