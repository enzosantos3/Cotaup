package com.victorMarchiDev.mvp.controller;

import com.victorMarchiDev.mvp.dto.PedidoDTO;
import com.victorMarchiDev.mvp.dto.ProdutoDTO;
import com.victorMarchiDev.mvp.service.PedidoService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/pedidos")
@AllArgsConstructor
public class PedidoController {

    private final PedidoService service;


    @GetMapping("/listar")
    public List<PedidoDTO> listarPedidos(){
        return service.listarPedidos();
    }

    @PostMapping("/criar")
    public ResponseEntity<PedidoDTO> criarPedido(@RequestBody PedidoDTO dto){
        System.out.println("Comprador: " + dto.idComprador());
        System.out.println("Fornecedor: " + dto.idFornecedor());
        System.out.println("Cotacao: " + dto.idCotacao());
        PedidoDTO pedidoSalvo = service.criarPedido(dto);
        return ResponseEntity.ok().body(pedidoSalvo);
    }

}
