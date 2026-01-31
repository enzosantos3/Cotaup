package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.ProdutoCotacaoDTO;
import com.victorMarchiDev.mvp.model.ProdutoCotacaoModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
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
    @Mapping(target = "produto", source = "produtoId")
    @Mapping(target = "proposta", ignore = true)
    @Mapping(target = "valorTotal", ignore = true)
    ProdutoCotacaoModel toEntity(ProdutoCotacaoDTO dto);

    default ProdutoModel map(Long id) {
        if (id == null) return null;
        ProdutoModel p = new ProdutoModel();
        p.setId(id);
        return p;
    }
}
