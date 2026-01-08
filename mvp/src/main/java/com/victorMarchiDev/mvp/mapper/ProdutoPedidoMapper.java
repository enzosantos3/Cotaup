package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.ProdutoCotacaoDTO;
import com.victorMarchiDev.mvp.dto.ProdutoPedidoDTO;
import com.victorMarchiDev.mvp.model.ProdutoPedidoModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProdutoPedidoMapper {
    ProdutoPedidoModel toEntity(ProdutoPedidoDTO  dto);
    ProdutoPedidoDTO toDto(ProdutoPedidoModel model);
}
