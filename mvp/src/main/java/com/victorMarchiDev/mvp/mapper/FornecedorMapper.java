package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.FornecedorDTO;
import com.victorMarchiDev.mvp.model.FornecedorModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FornecedorMapper {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "usuario.email", target = "email")
    @Mapping(source = "usuario.role", target = "role")

    @Mapping(source = "empresa.id", target = "empresaId")
    @Mapping(source = "empresa.nomeFantasia", target = "nomeFantasia")
    @Mapping(source = "empresa.inscricaoEstadual", target = "inscricaoEstadual")
    @Mapping(source = "empresa.endereco", target = "endereco")
    @Mapping(source = "empresa.razaoSocial", target = "razaoSocial")
    @Mapping(source = "empresa.cnpj", target = "cnpj")
    FornecedorDTO toDto(FornecedorModel fornecedor);

    @Mapping(source = "usuarioId", target = "usuario.id")
    @Mapping(target = "empresa", ignore = true)
    FornecedorModel toEntity(FornecedorDTO dto);
}

