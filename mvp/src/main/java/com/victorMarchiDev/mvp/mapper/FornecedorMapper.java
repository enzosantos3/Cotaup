package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.FornecedorDTO;
import com.victorMarchiDev.mvp.model.FornecedorModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FornecedorMapper {
    FornecedorModel toEntity(FornecedorDTO dto);
    FornecedorDTO toDto(FornecedorModel fornecedor);
}
