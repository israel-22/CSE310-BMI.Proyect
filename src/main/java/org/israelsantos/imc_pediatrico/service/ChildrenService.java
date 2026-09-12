package org.israelsantos.imc_pediatrico.service;

import org.israelsantos.imc_pediatrico.entity.Children;
import org.israelsantos.imc_pediatrico.repository.ChildrenRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChildrenService {

    private final ChildrenRepository childrenRepository;

    public ChildrenService(ChildrenRepository childrenRepository) {
        this.childrenRepository = childrenRepository;
    }
    public Children save(Children child){
        return childrenRepository.save(child);
    }
    public List<Children> findAll() {
        return childrenRepository.findAll();
    }
    public Optional<Children> findById(String identification) {
        return childrenRepository.findById(identification);
    }

    public Optional<Children> update(String identification, Children updatedChild) {

        Optional<Children> existingChild = childrenRepository.findById(identification);

        if (existingChild.isPresent()) {
            Children child = existingChild.get();

            child.setFirstName(updatedChild.getFirstName());
            child.setLastName(updatedChild.getLastName());
            child.setBirthDate(updatedChild.getBirthDate());
            child.setGender(updatedChild.getGender());
            child.setFamilyHistory(updatedChild.getFamilyHistory());
            child.setPersonalHistory(updatedChild.getPersonalHistory());

            return Optional.of(childrenRepository.save(child));
        }

        return Optional.empty();
    }
    public boolean delete(String identification) {

        if (childrenRepository.existsById(identification)) {
            childrenRepository.deleteById(identification);
            return true;
        }

        return false;
    }
}