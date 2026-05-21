package com.proyecto.perfumeHud;

import com.proyecto.perfumeHud.model.Marca;
import com.proyecto.perfumeHud.model.Perfume;
import com.proyecto.perfumeHud.repositories.MarcaRepository;
import com.proyecto.perfumeHud.repositories.PerfumeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PerfumeHudApplication {

    public static void main(String[] args) {
        SpringApplication.run(PerfumeHudApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(MarcaRepository marcaRepo, PerfumeRepository perfumeRepo) {
        return args -> {
            // Creamos una Marca
            Marca dior = new Marca();
            dior.setNombre("Dior");
            marcaRepo.save(dior);

            Marca pacoRabanne = new Marca();
            pacoRabanne.setNombre("Paco Rabanne");
            marcaRepo.save(pacoRabanne);

            Perfume sauvage = new Perfume();
            sauvage.setNombre("Sauvage");
            sauvage.setPrecio(95.50);
            sauvage.setMarca(dior);
            perfumeRepo.save(sauvage);

            Perfume invictus = new Perfume();
            invictus.setNombre("Invictus");
            invictus.setPrecio(75.00);
            invictus.setMarca(pacoRabanne);
            perfumeRepo.save(invictus);
            
            System.out.println("¡Datos de prueba cargados en H2!");
        };
    }
}