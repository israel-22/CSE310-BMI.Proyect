package org.israelsantos.imc_pediatrico.repository;

import org.israelsantos.imc_pediatrico.entity.Children;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildrenRepository extends JpaRepository<Children, String> {
}