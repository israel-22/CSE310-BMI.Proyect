package org.israelsantos.imc_pediatrico.service;

public class Age {

    private int years;
    private int months;
    private int weeks;
    private int days;
    private int totalMonths;

    public Age(int years, int months, int weeks, int days, int totalMonths) {
        this.years = years;
        this.months = months;
        this.weeks = weeks;
        this.days = days;
        this.totalMonths = totalMonths;
    }


    public int getYears() {
        return years;
    }

    public int getMonths() {
        return months;
    }

    public int getWeeks() {
        return weeks;
    }

    public int getDays() {
        return days;
    }

    public int getTotalMonths() {
        return totalMonths;
    }

    public String getDescription() {

        if (years > 0) {
            return years + " years " + months + " months";
        }

        if (months > 0) {
            return months + " months";
        }

        if (weeks > 0) {
            return weeks + " weeks";
        }

        return days + " days";
    }

}