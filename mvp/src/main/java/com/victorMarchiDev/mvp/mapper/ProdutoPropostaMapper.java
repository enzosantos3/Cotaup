package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.ProdutoCotacaoDTO;
import com.victorMarchiDev.mvp.dto.ProdutoPropostaDTO;
import com.victorMarchiDev.mvp.model.ProdutoCotacaoModel;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import com.victorMarchiDev.mvp.model.ProdutoPropostaModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProdutoPropostaMapper {

    @Mapping(target = "produtoId", source = "produto.id")
    @Mapping(target = "nomeProduto", source = "produto.nome")
    ProdutoPropostaDTO toDto(ProdutoPropostaModel model);

    @Mapping(target = "proposta", ignore = true)
    @Mapping(target = "produto", source = "produtoId")
    @Mapping(target = "valorTotal", ignore = true)
    ProdutoPropostaModel toEntity(ProdutoPropostaDTO dto);

    default ProdutoModel map(Long id) {
        if (id == null) return null;
        ProdutoModel p = new ProdutoModel();
        p.setId(id);
        return p;
    }
}
