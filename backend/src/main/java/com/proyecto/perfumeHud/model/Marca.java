package com.proyecto.perfumeHud.model;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data 
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @OneToMany(mappedBy = "marca", cascade = CascadeType.ALL)
    private List<Perfume> perfumes;
}