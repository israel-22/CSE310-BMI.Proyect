package org.israelsantos.imc_pediatrico.projection;

import java.time.LocalDate;

public interface ChildControlView {

    String getIdentification();

    String getFirstName();

    String getLastName();

    String getGender();

    LocalDate getBirthDate();

    LocalDate getControlDate();

    Double getWeight();

    Double getHeight();

    Double getBmi();
}
