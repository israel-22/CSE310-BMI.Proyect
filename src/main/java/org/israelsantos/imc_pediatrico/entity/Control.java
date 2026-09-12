package org.israelsantos.imc_pediatrico.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "controls")
public class Control {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate controlDate;

    private Double weight;
    private Double height;
    private Double bmi;
    private Double headCircumference;
    private Double thoracicCircumference;
    private Double abdominalCircumference;

    private Integer heartRate;
    private Integer respiratoryRate;
    private Integer oxygenSaturation;

    private Double temperature;
    private Double hemoglobin;

    private String heightForAgeResult;
    private String weightForAgeResult;
    private String bmiForAgeResult;

    private String diet;
    private Integer mealsPerDay;


    @ManyToOne
    @JoinColumn(name ="child_id")
    private Children child;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getControlDate() {
        return controlDate;
    }

    public void setControlDate(LocalDate controlDate) {
        this.controlDate = controlDate;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getHeadCircumference() {
        return headCircumference;
    }

    public void setHeadCircumference(Double headCircumference) {
        this.headCircumference = headCircumference;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getThoracicCircumference() {
        return thoracicCircumference;
    }

    public void setThoracicCircumference(Double thoracicCircumference) {
        this.thoracicCircumference = thoracicCircumference;
    }

    public Double getAbdominalCircumference() {
        return abdominalCircumference;
    }

    public void setAbdominalCircumference(Double abdominalCircumference) {
        this.abdominalCircumference = abdominalCircumference;
    }

    public Integer getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(Integer heartRate) {
        this.heartRate = heartRate;
    }

    public Integer getRespiratoryRate() {
        return respiratoryRate;
    }

    public void setRespiratoryRate(Integer respiratoryRate) {
        this.respiratoryRate = respiratoryRate;
    }

    public Integer getOxygenSaturation() {
        return oxygenSaturation;
    }

    public void setOxygenSaturation(Integer oxygenSaturation) {
        this.oxygenSaturation = oxygenSaturation;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getHemoglobin() {
        return hemoglobin;
    }

    public void setHemoglobin(Double hemoglobin) {
        this.hemoglobin = hemoglobin;
    }

    public String getHeightForAgeResult() {
        return heightForAgeResult;
    }

    public void setHeightForAgeResult(String heightForAgeResult) {
        this.heightForAgeResult = heightForAgeResult;
    }

    public String getWeightForAgeResult() {
        return weightForAgeResult;
    }

    public void setWeightForAgeResult(String weightForAgeResult) {
        this.weightForAgeResult = weightForAgeResult;
    }

    public String getBmiForAgeResult() {
        return bmiForAgeResult;
    }

    public void setBmiForAgeResult(String bmiForAgeResult) {
        this.bmiForAgeResult = bmiForAgeResult;
    }

    public String getDiet() {
        return diet;
    }

    public void setDiet(String diet) {
        this.diet = diet;
    }

    public Integer getMealsPerDay() {
        return mealsPerDay;
    }

    public void setMealsPerDay(Integer mealsPerDay) {
        this.mealsPerDay = mealsPerDay;
    }

    public Children getChild() {
        return child;
    }

    public void setChild(Children child) {
        this.child = child;
    }

    public Double getBmi(){
        return bmi;
    }

    public void setBmi(Double bmi){
        this.bmi = bmi;
    }
}