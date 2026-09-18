package org.israelsantos.imc_pediatrico.controller;

import org.israelsantos.imc_pediatrico.entity.Control;
import org.israelsantos.imc_pediatrico.projection.ChildControlView;
import org.israelsantos.imc_pediatrico.service.ControlService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ControlController {

    private final ControlService controlService;

    public ControlController(ControlService controlService) {
        this.controlService = controlService;
    }

    @PostMapping("/api/controls")
    public Control createControl(@RequestBody Control control) {
        return controlService.save(control);
    }

    @GetMapping("/api/controls")
    public List<Control> getAllControls() {
        return controlService.findAll();
    }
    @GetMapping("/api/children/{identification}/controls")
    public List<Control> getControlsByChild(
            @PathVariable String identification) {

        return controlService.findByChildIdentification(identification);
    }

    @GetMapping("/api/controls/{id}")
    public ResponseEntity<?> getControlById(@PathVariable Long id) {

        Optional<Control> control = controlService.findById(id);

        if (control.isPresent()) {
            return ResponseEntity.ok(control.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/api/controls/{id}")
    public ResponseEntity<?> updateControl(
            @PathVariable Long id,
            @RequestBody Control updatedControl) {

        Optional<Control> control = controlService.update(id, updatedControl);

        if (control.isPresent()) {
            return ResponseEntity.ok(control.get());
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/api/controls/{id}")
    public ResponseEntity<?> deleteControl(@PathVariable Long id) {

        boolean deleted = controlService.delete(id);

        if (deleted) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
    @GetMapping("/api/controls/average-bmi")
    public double getAverageBmi() {
        return controlService.calculateAverageBmi();
    }

    @GetMapping("/api/children/{identification}/history")
    public List<ChildControlView> getChildControlHistory(
            @PathVariable String identification) {

        return controlService.findChildControlHistory(identification);
    }
}