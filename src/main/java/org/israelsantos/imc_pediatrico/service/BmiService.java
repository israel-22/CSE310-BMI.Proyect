package org.israelsantos.imc_pediatrico.service;

import org.springframework.stereotype.Service;

@Service
public class BmiService {

    public double calculateBmi(double weight, double height) {

        if(weight <=0 || height<=0){
            throw  new IllegalArgumentException("Weight and height must be greater than zero");
        }
        // Convert height from centimeters to meters.
        double heightInMeters = height / 100;
        double bmi = weight / (heightInMeters * heightInMeters);

        return Math.round(bmi * 100.0) / 100.0;
    }
}