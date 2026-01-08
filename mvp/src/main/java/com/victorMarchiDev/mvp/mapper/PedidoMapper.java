package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.PedidoDTO;
import com.victorMarchiDev.mvp.model.PedidoModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface PedidoMapper {
    
    @Mapping(source = "cotacao.id", target = "idCotacao")
    @Mapping(source = "fornecedor.id", target = "idFornecedor")
    @Mapping(source = "comprador.id", target = "idComprador")
    PedidoDTO toDto(PedidoModel model);

    PedidoModel toEntity(PedidoDTO dto);
}

