package org.israelsantos.imc_pediatrico;

import org.israelsantos.imc_pediatrico.service.WeightForAgeService;

public class WeightForAgeTest {

    public static void main(String[] args) {

        WeightForAgeService service = new WeightForAgeService();

        double age = 2.5;

        System.out.println("+3: " + service.getPlus3(age));
        System.out.println("+2: " + service.getPlus2(age));
        System.out.println("Median: " + service.getMedian(age));
        System.out.println("-2: " + service.getMinus2(age));
        System.out.println("-3: " + service.getMinus3(age));
    }
}