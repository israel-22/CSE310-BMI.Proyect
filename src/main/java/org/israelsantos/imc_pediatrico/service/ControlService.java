package org.israelsantos.imc_pediatrico.service;

import org.israelsantos.imc_pediatrico.entity.Control;
import org.israelsantos.imc_pediatrico.repository.ControlRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ControlService {

    private final ControlRepository controlRepository;
    private final BmiService bmiService;

    public ControlService(ControlRepository controlRepository, BmiService bmiService) {
        this.controlRepository = controlRepository;
        this.bmiService = bmiService;
    }

    public Control save(Control control) {
        double bmi = bmiService.calculateBmi(
                control.getWeight(),
                control.getHeight()
        );
        control.setBmi(bmi);
        return controlRepository.save(control);
    }

    public List<Control> findAll() {
        return controlRepository.findAll();
    }

    public Optional<Control> findById(Long id) {
        return controlRepository.findById(id);
    }
    public List<Control> findByChildIdentification(String identification) {
        return controlRepository.findByChildIdentification(identification);
    }

    public Optional<Control> update(Long id, Control updatedControl) {

        Optional<Control> existingControl = controlRepository.findById(id);

        if (existingControl.isPresent()) {
            Control control = existingControl.get();

            control.setControlDate(updatedControl.getControlDate());
            control.setWeight(updatedControl.getWeight());
            control.setHeight(updatedControl.getHeight());
            control.setHeadCircumference(updatedControl.getHeadCircumference());
            control.setThoracicCircumference(updatedControl.getThoracicCircumference());
            control.setAbdominalCircumference(updatedControl.getAbdominalCircumference());
            control.setHeartRate(updatedControl.getHeartRate());
            control.setRespiratoryRate(updatedControl.getRespiratoryRate());
            control.setOxygenSaturation(updatedControl.getOxygenSaturation());
            control.setTemperature(updatedControl.getTemperature());
            control.setHemoglobin(updatedControl.getHemoglobin());
            control.setHeightForAgeResult(updatedControl.getHeightForAgeResult());
            control.setWeightForAgeResult(updatedControl.getWeightForAgeResult());
            control.setBmiForAgeResult(updatedControl.getBmiForAgeResult());
            control.setDiet(updatedControl.getDiet());
            control.setMealsPerDay(updatedControl.getMealsPerDay());
            double bmi = bmiService.calculateBmi(
                    updatedControl.getWeight(),
                    updatedControl.getHeight()
            );
            control.setBmi(bmi);

            return Optional.of(controlRepository.save(control));
        }

        return Optional.empty();
    }

    public boolean delete(Long id) {

        if (controlRepository.existsById(id)) {
            controlRepository.deleteById(id);
            return true;
        }

        return false;
    }

    public double calculateAverageBmi() {

        List<Control> controls = controlRepository.findAll();

        double totalBmi = 0;

        for (Control control : controls) {
            totalBmi += control.getBmi();
        }

        if (controls.isEmpty()) {
            return 0;
        }

        return Math.round((totalBmi / controls.size()) * 100.0) / 100.0;
    }

}