package org.israelsantos.imc_pediatrico.repository;

import org.israelsantos.imc_pediatrico.entity.Control;
import org.israelsantos.imc_pediatrico.projection.ChildControlView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ControlRepository extends JpaRepository<Control, Long> {

    List<Control> findByChildIdentification(String identification);

    @Query(value = """
            SELECT
                c.identification AS identification,
                c.first_name AS firstName,
                c.last_name AS lastName,
                c.gender AS gender,
                c.birth_date AS birthDate,
                co.control_date AS controlDate,
                co.weight AS weight,
                co.height AS height,
                co.bmi AS bmi
            FROM children c
            JOIN controls co
                ON c.identification = co.child_id
            WHERE c.identification = :identification
            ORDER BY co.control_date
            """, nativeQuery = true)
    List<ChildControlView> findChildControlHistory(
            @Param("identification") String identification
    );
}