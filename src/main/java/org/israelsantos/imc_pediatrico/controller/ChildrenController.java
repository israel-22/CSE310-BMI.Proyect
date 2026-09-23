package org.israelsantos.imc_pediatrico.controller;
import org.springframework.web.bind.annotation.*;

import org.israelsantos.imc_pediatrico.service.ChildrenService;
import org.israelsantos.imc_pediatrico.entity.Children;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
public class ChildrenController {

    private final ChildrenService childrenService;

    public ChildrenController(ChildrenService childrenService) {
        this.childrenService = childrenService;
    }

    @GetMapping("/api/children/test")
    public String test() {
        return "Children API is working";
    }

    @GetMapping("/api/children")
    public List<Children> getAllChildren() {
        return childrenService.findAll();
    }
    @GetMapping("/api/children/{identification}")
    public ResponseEntity<?> getChildById(@PathVariable String identification) {

        Optional<Children> child = childrenService.findById(identification);

        if (child.isPresent()) {
            return ResponseEntity.ok(child.get());
        }

        return ResponseEntity.notFound().build();
    }
    @PutMapping("/api/children/{identification}")
    public ResponseEntity<?> updateChild(
            @PathVariable String identification,
            @RequestBody Children updatedChild) {

        Optional<Children> child = childrenService.update(identification, updatedChild);

        if (child.isPresent()) {
            return ResponseEntity.ok(child.get());
        }


        return ResponseEntity.notFound().build();
    }

    @PostMapping("/api/children")
    public ResponseEntity<Children> createChild(@RequestBody Children child) {

        try {

            Children savedChild = childrenService.save(child);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedChild);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .build();
        }
    }

    @DeleteMapping("/api/children/{identification}")
    public ResponseEntity<?> deleteChild(
            @PathVariable String identification) {

        boolean deleted = childrenService.delete(identification);

        if (deleted) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }


}