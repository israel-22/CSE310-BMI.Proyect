package org.israelsantos.imc_pediatrico.service;

import org.springframework.stereotype.Service;

@Service
public class BmiForAgeService implements GrowthCalculator {

    private final double[] plus3Boys = {
            18.1, 21.6, 20.3, 20.0, 19.9, 20.3
    };

    private final double[] plus2Boys = {
            16.3, 19.8, 18.5, 18.4, 18.2, 18.3
    };

    private final double[] medianBoys = {
            13.4, 16.8, 15.7, 15.6, 15.3, 15.2
    };

    private final double[] minus2Boys = {
            11.1, 14.4, 13.6, 13.4, 13.1, 12.9
    };

    private final double[] minus3Boys = {
            10.2, 13.4, 12.7, 12.4, 12.1, 12.0
    };


    private final double[] plus3Girls = {
            17.7, 21.6, 20.3, 20.3, 20.6, 21.1
    };

    private final double[] plus2Girls = {
            16.1, 19.6, 18.4, 18.4, 18.5, 18.8
    };

    private final double[] medianGirls = {
            13.3, 16.4, 15.4, 15.4, 15.3, 15.3
    };

    private final double[] minus2Girls = {
            11.1, 13.8, 13.1, 13.1, 12.8, 12.7
    };

    private final double[] minus3Girls = {
            10.1, 12.7, 12.1, 12.1, 11.8, 11.6
    };


    public double interpolate(double[] values, double age) {

        if (age < 0 || age > 5) {
            throw new IllegalArgumentException(
                    "Age must be between 0 and 5 years"
            );
        }

        int lowerAge = (int) Math.floor(age);

        if (lowerAge == 5) {
            return values[5];
        }

        int upperAge = lowerAge + 1;

        double lowerValue = values[lowerAge];
        double upperValue = values[upperAge];

        double fraction = age - lowerAge;

        double result =
                lowerValue + (upperValue - lowerValue) * fraction;

        return Math.round(result * 100.0) / 100.0;
    }


    private boolean isGirl(String gender) {

        return "FEMALE".equalsIgnoreCase(gender)
                || "GIRL".equalsIgnoreCase(gender);
    }


    public double getPlus3(double age, String gender) {

        double[] values = isGirl(gender)
                ? plus3Girls
                : plus3Boys;

        return interpolate(values, age);
    }


    public double getPlus2(double age, String gender) {

        double[] values = isGirl(gender)
                ? plus2Girls
                : plus2Boys;

        return interpolate(values, age);
    }


    public double getMedian(double age, String gender) {

        double[] values = isGirl(gender)
                ? medianGirls
                : medianBoys;

        return interpolate(values, age);
    }


    public double getMinus2(double age, String gender) {

        double[] values = isGirl(gender)
                ? minus2Girls
                : minus2Boys;

        return interpolate(values, age);
    }


    public double getMinus3(double age, String gender) {

        double[] values = isGirl(gender)
                ? minus3Girls
                : minus3Boys;

        return interpolate(values, age);
    }


    @Override
    public String classify(double bmi, double age, String gender) {

        double bmiPlus3 = getPlus3(age, gender);
        double bmiPlus2 = getPlus2(age, gender);
        double bmiMedian = getMedian(age, gender);
        double bmiMinus2 = getMinus2(age, gender);
        double bmiMinus3 = getMinus3(age, gender);

        if (bmi > bmiPlus3) {

            return "Above +3 SD - The child is obese.";

        } else if (bmi > bmiPlus2) {

            return "Between +3 and +2 SD - The child is overweight.";

        } else if (bmi > bmiMedian) {

            return "Between +2 and 0 SD - The child is within the normal BMI range.";

        } else if (bmi > bmiMinus2) {

            return "Between 0 and -2 SD - The child is within the normal BMI range.";

        } else if (bmi > bmiMinus3) {

            return "Between -2 and -3 SD - The child is underweight and may be at risk of malnutrition.";

        } else {

            return "Below -3 SD - The child is severely underweight and may be at risk of malnutrition.";
        }
    }
}