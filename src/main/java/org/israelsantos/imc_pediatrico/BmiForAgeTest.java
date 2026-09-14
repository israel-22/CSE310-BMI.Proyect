package org.israelsantos.imc_pediatrico;

import org.israelsantos.imc_pediatrico.service.BmiForAgeService;

public class BmiForAgeTest {

    public static void main(String[] args) {

        BmiForAgeService service = new BmiForAgeService();

        double age = 2.5;
        double bmi = 15.88;

        System.out.println("BMI-for-Age test");
        System.out.println("Age: " + age + " years");
        System.out.println("BMI: " + bmi);

        System.out.println();
        System.out.println("BOY:");

        System.out.println("Plus 3 SD: "
                + service.getPlus3(age, "MALE"));

        System.out.println("Plus 2 SD: "
                + service.getPlus2(age, "MALE"));

        System.out.println("Median: "
                + service.getMedian(age, "MALE"));

        System.out.println("Minus 2 SD: "
                + service.getMinus2(age, "MALE"));

        System.out.println("Minus 3 SD: "
                + service.getMinus3(age, "MALE"));


        System.out.println();
        System.out.println("GIRL:");

        System.out.println("Plus 3 SD: "
                + service.getPlus3(age, "FEMALE"));

        System.out.println("Plus 2 SD: "
                + service.getPlus2(age, "FEMALE"));

        System.out.println("Median: "
                + service.getMedian(age, "FEMALE"));

        System.out.println("Minus 2 SD: "
                + service.getMinus2(age, "FEMALE"));

        System.out.println("Minus 3 SD: "
                + service.getMinus3(age, "FEMALE"));


        System.out.println();
        System.out.println("Classification test:");

        System.out.println("Boy: "
                + service.classify(bmi, age, "MALE"));

        System.out.println("Girl: "
                + service.classify(bmi, age, "FEMALE"));
    }
}