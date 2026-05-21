package com.proyecto.perfumeHud.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Perfume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Double precio;

    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;
}