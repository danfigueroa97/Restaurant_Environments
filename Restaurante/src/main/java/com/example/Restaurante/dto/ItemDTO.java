package com.example.Restaurante.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {
  private Long idPlato;
  private Integer cantidad;
}

  // {"idPlato": 1, "cantidad": 2}, {"idPlato": 2, "cantidad": 3}, {"idPlato": 3, "cantidad": 1}
