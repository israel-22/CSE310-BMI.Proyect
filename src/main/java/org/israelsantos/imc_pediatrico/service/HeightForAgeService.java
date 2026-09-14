package org.israelsantos.imc_pediatrico.service;

import org.springframework.stereotype.Service;

@Service
public class HeightForAgeService implements GrowthCalculator {

    private final double[] plus3Boys = {
            55.5, 83, 97, 107, 116, 124
    };

    private final double[] plus2Boys = {
            53.5, 80.5, 94, 103.5, 112, 119
    };

    private final double[] medianBoys = {
            50, 75.5, 86.5, 96, 103, 110
    };

    private final double[] minus2Boys = {
            46, 71, 81, 89, 95, 101
    };

    private final double[] minus3Boys = {
            44, 69, 78.5, 85, 91, 96
    };


    private final double[] plus3Girls = {
            55, 82, 96, 106, 116, 124
    };

    private final double[] plus2Girls = {
            53, 79.5, 93, 103, 111, 119
    };

    private final double[] medianGirls = {
            49.5, 74, 86, 95, 103, 109
    };

    private final double[] minus2Girls = {
            45, 69, 80, 87, 94, 100
    };

    private final double[] minus3Girls = {
            43.5, 66.5, 77, 84, 90, 95
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
    public String classify(double height, double age, String gender) {

        double heightPlus3 = getPlus3(age, gender);
        double heightPlus2 = getPlus2(age, gender);
        double heightMedian = getMedian(age, gender);
        double heightMinus2 = getMinus2(age, gender);
        double heightMinus3 = getMinus3(age, gender);

        if (height > heightPlus3) {

            return "Above +3 SD - The child is at the upper extreme of the normal range; monitor for sudden changes.";

        } else if (height > heightPlus2) {

            return "Between +3 and +2 SD - The child is at the upper extreme of the normal range; monitor for sudden changes.";

        } else if (height > heightMedian) {

            return "Between +2 and 0 SD - The child is within the normal growth range.";

        } else if (height > heightMinus2) {

            return "Between 0 and -2 SD - The child is within the normal growth range.";

        } else if (height > heightMinus3) {

            return "Between -2 and -3 SD - The child is at the lower extreme of the normal range; possible growth problems.";

        } else {

            return "Below -3 SD - The child is at the lower extreme of the normal range; possible growth problems.";
        }
    }
}