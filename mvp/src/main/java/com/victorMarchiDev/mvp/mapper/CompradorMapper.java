package com.victorMarchiDev.mvp.mapper;

import com.victorMarchiDev.mvp.dto.CompradorDTO;
import com.victorMarchiDev.mvp.model.CompradorModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CompradorMapper {
    CompradorModel toEntity(CompradorDTO dto);
    CompradorDTO toDto(CompradorModel model);
}
