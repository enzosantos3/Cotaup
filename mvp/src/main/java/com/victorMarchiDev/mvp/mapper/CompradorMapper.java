package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.CompradorDTO;
import com.victorMarchiDev.mvp.model.CompradorModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CompradorMapper {

    @Mapping(source = "usuarioId", target = "usuario.id")
    @Mapping(source = "empresaId", target = "empresa.id")
    CompradorModel toEntity(CompradorDTO dto);

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "usuario.email", target = "email")
    @Mapping(source = "usuario.role", target = "role")

    @Mapping(source = "empresa.id", target = "empresaId")
    @Mapping(source = "empresa.nomeFantasia", target = "nomeFantasia")
    @Mapping(source = "empresa.inscricaoEstadual", target = "inscricaoEstadual")
    @Mapping(source = "empresa.endereco", target = "endereco")
    @Mapping(source = "empresa.razaoSocial", target = "razaoSocial")
    @Mapping(source = "empresa.cnpj", target = "cnpj")
    CompradorDTO toDto(CompradorModel model);
}
