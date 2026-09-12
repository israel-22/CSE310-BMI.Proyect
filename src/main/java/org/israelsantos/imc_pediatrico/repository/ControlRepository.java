package org.israelsantos.imc_pediatrico.repository;

import org.israelsantos.imc_pediatrico.entity.Control;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ControlRepository extends JpaRepository<Control, Long> {
    List<Control> findByChildIdentification(String identification);
}