package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.UsuarioDTO;
import com.victorMarchiDev.mvp.model.UsuarioModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    UsuarioDTO toDTO(UsuarioModel model);
    UsuarioModel toEntity(UsuarioDTO dto);
}
