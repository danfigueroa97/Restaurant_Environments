package com.example.Restaurante.dto;

import java.util.List;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrearPedidoDTO {
  private Long idMesa;

  private List<ItemDTO> items;
}
