package com.victorMarchiDev.mvp.repository;

import com.victorMarchiDev.mvp.model.CompradorModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompradorRepository extends JpaRepository<CompradorModel, Long> {
}
