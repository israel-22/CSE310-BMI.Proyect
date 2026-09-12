package org.israelsantos.imc_pediatrico.service;

import org.springframework.stereotype.Service;

@Service
public class WeightForAgeService implements GrowthCalculator {

    private final double[] plus3 = {
            5, 13.4, 17, 20.8, 24.2, 28
    };

    private final double[] plus2 = {
            4.5, 12, 15.4, 18.2, 21.2, 24
    };

    private final double[] median = {
            3.2, 9.8, 12.1, 14.4, 16.4, 18.2
    };

    private final double[] minus2 = {
            2.5, 7.8, 9.7, 11.2, 12.8, 14
    };

    private final double[] minus3 = {
            2, 7, 8.6, 10, 11.2, 12.4
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
// Interpolate between the two closest age values.
        double fraction = age - lowerAge;

        double result =
                lowerValue + (upperValue - lowerValue) * fraction;

        return Math.round(result * 100.0) / 100.0;
    }

    public double getPlus3(double age) {
        return interpolate(plus3, age);
    }

    public double getPlus2(double age) {
        return interpolate(plus2, age);
    }

    public double getMedian(double age) {
        return interpolate(median, age);
    }

    public double getMinus2(double age) {
        return interpolate(minus2, age);
    }

    public double getMinus3(double age) {
        return interpolate(minus3, age);
    }
@Override
    public String classify(double weight, double age) {

        double weightPlus3 = getPlus3(age);
        double weightPlus2 = getPlus2(age);
        double weightMedian = getMedian(age);
        double weightMinus2 = getMinus2(age);
        double weightMinus3 = getMinus3(age);

        if (weight > weightPlus3) {
            return "Superior a 3 - El niño presenta obesidad.";

        } else if (weight > weightPlus2) {
            return "Between 3 and 2 – The child is at higher risk of an excess-related disorder; possible overweight.";

        } else if (weight > weightMedian) {
            return "Between 2 and 0 – The child falls within the normal weight range for their age.";

        } else if (weight > weightMinus2) {
            return "Between 0 and -2 – The child is within the normal weight range for their age.";

        } else if (weight > weightMinus3) {
            return "Between -2 and -3 – The child is underweight for their age and prone to malnutrition.";

        } else {
            return "Below -3 – The child is malnourished.";
        }
    }
    /*NOTA ANCELMO DEL FUTURO, SE ESTA CREANDO LAS FORMULAS PARA REALIZAR LOS CALCULOS PERO SOLO LAS DE LOS VARONES, UNA VES QUE SE TERMINE DE PROVAR SE PASA A LAS NIÑAS SI-NO SERA UN DESASTRE OTRA VEZ*/
}