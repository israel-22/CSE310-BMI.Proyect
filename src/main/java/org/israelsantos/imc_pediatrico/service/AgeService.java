package org.israelsantos.imc_pediatrico.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
public class AgeService {

    public Age calculateAge(LocalDate birthDate, LocalDate controlDate) {

        if (birthDate == null || controlDate == null) {
            throw new IllegalArgumentException("Birth date and control date are required");
        }

        if (birthDate.isAfter(controlDate)) {
            throw new IllegalArgumentException("Birth date cannot be after control date");
        }

        Period period = Period.between(birthDate, controlDate);

        int years = period.getYears();
        int months = period.getMonths();
        int days = period.getDays();

        int weeks = days / 7;
        int remainingDays = days % 7;

        int totalMonths = (years * 12) + months;

        return new Age(
                years,
                months,
                weeks,
                remainingDays,
                totalMonths
        );
    }
}