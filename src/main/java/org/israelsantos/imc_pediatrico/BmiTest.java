package org.israelsantos.imc_pediatrico;

import org.israelsantos.imc_pediatrico.service.BmiService;

public class BmiTest {

    public static void main(String[] args) {

        BmiService bmiService = new BmiService();

        double bmi = bmiService.calculateBmi(21.0, 115.0);

        System.out.println("BMI: " + bmi);
    }

}