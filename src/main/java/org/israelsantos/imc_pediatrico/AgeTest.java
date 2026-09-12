package org.israelsantos.imc_pediatrico;

import org.israelsantos.imc_pediatrico.service.Age;
import org.israelsantos.imc_pediatrico.service.AgeService;

import java.time.LocalDate;

public class AgeTest {

    public static void main(String[] args) {

        AgeService ageService = new AgeService();

        LocalDate birthDate = LocalDate.of(2026, 7, 10);
        LocalDate controlDate = LocalDate.of(2026, 9, 10);

        Age age = ageService.calculateAge(birthDate, controlDate);

        System.out.println("Years: " + age.getYears());
        System.out.println("Months: " + age.getMonths());
        System.out.println("Weeks: " + age.getWeeks());
        System.out.println("Days: " + age.getDays());
        System.out.println("Total months: " + age.getTotalMonths());
        System.out.println("Description: " + age.getDescription());
    }
}