package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.ProdutoDTO;
import com.victorMarchiDev.mvp.model.ProdutoModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {
    ProdutoModel toEntity(ProdutoDTO dto);
    ProdutoDTO toDTO(ProdutoModel produto);
}
