package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.EmpresaDTO;
import com.victorMarchiDev.mvp.model.EmpresaModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmpresaMapper {
    EmpresaModel toEntity(EmpresaDTO empresaDTO);
    EmpresaDTO toDto(EmpresaModel empresaModel);
}
