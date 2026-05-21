package com.proyecto.perfumeHud.repositories;

import com.proyecto.perfumeHud.model.Marca; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
public interface MarcaRepository extends JpaRepository<Marca, Long> {
}