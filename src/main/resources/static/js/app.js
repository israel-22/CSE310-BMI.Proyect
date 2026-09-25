async function loadChildren() {

    try {

        const response = await fetch('/api/children');

        if (!response.ok) {
            throw new Error('Failed to load children');
        }

        const children = await response.json();

        console.log('Children received from Spring Boot:', children);

        const list = document.getElementById('children-list');

        if (!list) {
            return;
        }

        list.innerHTML = '';

      children.forEach(child => {

          const childElement = document.createElement('div');

          childElement.innerHTML = `
              <p>
                  <strong>${child.identification}</strong>
                  - ${child.firstName} ${child.lastName}
              </p>

              <button type="button">
                  Open Record
              </button>

              <hr>
          `;

          const nameElement = childElement.querySelector('p');

          nameElement.style.cursor = 'pointer';

          nameElement.addEventListener('click', () => {

              selectChild(child);

          });

          const recordButton =
              childElement.querySelector('button');

          recordButton.addEventListener('click', () => {

              window.location.href =
                  `/pages/child-record.html?id=${child.identification}`;

          });

          list.appendChild(childElement);

      });

    } catch (error) {

        console.error('Error:', error);

    }
}

loadChildren();


function selectChild(child) {

    document.getElementById('identification').value =
        child.identification;

    document.getElementById('first-name').value =
        child.firstName;

    document.getElementById('last-name').value =
        child.lastName;

    document.getElementById('birth-date').value =
        child.birthDate;

    document.getElementById('family-history').value =
        child.familyHistory || '';

    document.getElementById('personal-history').value =
        child.personalHistory || '';

    const genderRadio =
        document.querySelector(
            `input[name="gender"][value="${child.gender}"]`
        );

    if (genderRadio) {
        genderRadio.checked = true;
    }

    console.log('Child selected:', child);
document.getElementById('update-child-button').disabled = false;
document.getElementById('delete-child-button').disabled = false;

}

async function updateChild() {

    const identification =
        document.getElementById('identification').value.trim();

    if (!identification) {
        alert('Identification is required');
        return;
    }

    const gender =
        document.querySelector('input[name="gender"]:checked');

    const updatedChild = {

        identification: identification,

        firstName:
            document.getElementById('first-name').value,

        lastName:
            document.getElementById('last-name').value,

        birthDate:
            document.getElementById('birth-date').value,

        gender:
            gender ? gender.value : null,

        familyHistory:
            document.getElementById('family-history').value,

        personalHistory:
            document.getElementById('personal-history').value
    };

    try {

        const response = await fetch(
            `/api/children/${identification}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedChild)
            }
        );

        if (!response.ok) {
            throw new Error('Failed to update child');
        }

        const savedChild = await response.json();

        console.log('Child updated:', savedChild);

        alert('Child updated successfully');

        loadChildren();

    } catch (error) {

        console.error('Error:', error);

    }
}

async function deleteChild() {

    const identification =
        document.getElementById('identification').value.trim();

    if (!identification) {
        alert('Select a child first');
        return;
    }

    const confirmed =
        confirm(
            `Are you sure you want to delete child ${identification}?`
        );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            `/api/children/${identification}`,
            {
                method: 'DELETE'
            }
        );

        if (!response.ok) {

            if (response.status === 409) {
                alert(
                    'This child cannot be deleted because they have control records.'
                );
                return;
            }

            throw new Error('Failed to delete child');
        }

        alert('Child deleted successfully');

        document.getElementById('child-form').reset();

        document.getElementById('update-child-button').disabled = true;
        document.getElementById('delete-child-button').disabled = true;

        loadChildren();

    } catch (error) {

        console.error('Error:', error);

    }
}


async function loadChildRecord() {
    const params = new URLSearchParams(window.location.search);
    const identification = params.get('id');

    console.log('Identification:', identification);

    if (!identification) {
        console.error('Child identification is missing');
        return;
    }

    try {
        const response = await fetch(`/api/children/${identification}`);

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error('Failed to load child');
        }

        const child = await response.json();

        console.log('Child received:', child);

        const record = document.getElementById('child-record');

        record.innerHTML = `
            <p><strong>Identification:</strong> ${child.identification}</p>
            <p><strong>First Name:</strong> ${child.firstName}</p>
            <p><strong>Last Name:</strong> ${child.lastName}</p>
            <p><strong>Birth Date:</strong> ${child.birthDate}</p>
            <p><strong>Gender:</strong> ${child.gender}</p>
        `;

    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadChildControls() {
    const params = new URLSearchParams(window.location.search);
    const identification = params.get('id');

    if (!identification) {
        console.error('Child identification is missing');
        return;
    }

    try {
        const response =
            await fetch(`/api/children/${identification}/controls`);

        if (!response.ok) {
            throw new Error('Failed to load child controls');
        }

        const controls = await response.json();

        console.log('Controls received from Spring Boot:', controls);

        const list = document.getElementById('controls-list');

        list.innerHTML = '';
        console.log('Controls list cleared');

        if (controls.length === 0) {
            list.innerHTML = '<p>No control records found.</p>';
            return;
        }

        controls.forEach(control => {

            const controlElement = document.createElement('div');

            controlElement.innerHTML = `
                <h3>Control Date: ${control.controlDate}</h3>

                <p>
                    <strong>Weight:</strong> ${control.weight} kg
                    <br>
                    <strong>Height:</strong> ${control.height} cm
                    <br>
                    <strong>BMI:</strong> ${control.bmi}
                </p>

                <p>
                    <strong>Head Circumference:</strong>
                    ${control.headCircumference ?? 'Not recorded'} cm
                    <br>

                    <strong>Thoracic Circumference:</strong>
                    ${control.thoracicCircumference ?? 'Not recorded'} cm
                    <br>

                    <strong>Abdominal Circumference:</strong>
                    ${control.abdominalCircumference ?? 'Not recorded'} cm
                </p>

                <p>
                    <strong>Heart Rate:</strong>
                    ${control.heartRate ?? 'Not recorded'} bpm
                    <br>

                    <strong>Respiratory Rate:</strong>
                    ${control.respiratoryRate ?? 'Not recorded'} breaths/min
                    <br>

                    <strong>Oxygen Saturation:</strong>
                    ${control.oxygenSaturation ?? 'Not recorded'}%
                    <br>

                    <strong>Temperature:</strong>
                    ${control.temperature ?? 'Not recorded'} °C
                    <br>

                    <strong>Hemoglobin:</strong>
                    ${control.hemoglobin ?? 'Not recorded'} g/dL
                </p>

                <p>
                    <strong>Diet:</strong>
                    ${control.diet ?? 'Not recorded'}
                    <br>

                    <strong>Meals per Day:</strong>
                    ${control.mealsPerDay ?? 'Not recorded'}
                </p>

                <p>
                    <strong>Weight for Age:</strong>
                    ${control.weightForAgeResult ?? 'Not calculated'}
                    <br>

                    <strong>Height for Age:</strong>
                    ${control.heightForAgeResult ?? 'Not calculated'}
                    <br>

                    <strong>BMI for Age:</strong>
                    ${control.bmiForAgeResult ?? 'Not calculated'}
                </p>
                  <button type="button" onclick="selectControl(${control.id})">Edit</button>
                  <button type="button" onclick="deleteControl(${control.id})">Delete</button>

                   <hr>
            `;

            list.appendChild(controlElement);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}
async function createControl() {

    const params = new URLSearchParams(window.location.search);
    const identification = params.get('id');

   const controlId =
       document.getElementById('control-id').value;

   console.log('Control ID before save:', controlId);

   const url = controlId
       ? `/api/controls/${controlId}`
       : '/api/controls';

   const method = controlId
       ? 'PUT'
       : 'POST';

    if (!identification) {
        console.error('Child identification is missing');
        return;
    }

    const control = {

        controlDate:
            document.getElementById('control-date').value,

        weight:
            parseFloat(document.getElementById('weight').value),

        height:
            parseFloat(document.getElementById('height').value),

        headCircumference:
            parseFloat(
                document.getElementById('head-circumference').value
            ) || null,

        thoracicCircumference:
            parseFloat(
                document.getElementById('thoracic-circumference').value
            ) || null,

        abdominalCircumference:
            parseFloat(
                document.getElementById('abdominal-circumference').value
            ) || null,

        heartRate:
            parseInt(
                document.getElementById('heart-rate').value
            ) || null,

        respiratoryRate:
            parseInt(
                document.getElementById('respiratory-rate').value
            ) || null,

        oxygenSaturation:
            parseInt(
                document.getElementById('oxygen-saturation').value
            ) || null,

        temperature:
            parseFloat(
                document.getElementById('temperature').value
            ) || null,

        hemoglobin:
            parseFloat(
                document.getElementById('hemoglobin').value
            ) || null,

        diet:
            document.getElementById('diet').value || null,

        mealsPerDay:
            document.getElementById('meals-per-day').value
                ? parseInt(
                    document.getElementById('meals-per-day').value
                )
                : null,

        child: {
            identification: identification
        }
    };

    console.log('Control to send:', control);

    try {

        const url = controlId
            ? `/api/controls/${controlId}`
            : '/api/controls';

        const method = controlId
            ? 'PUT'
            : 'POST';

        const response = await fetch(url, {

            method: method,

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(control)

        });

        if (!response.ok) {
            throw new Error('Failed to create control');
        }

        const savedControl = await response.json();

        console.log('Control saved:', savedControl);

        alert('Control saved successfully');

        document
            .getElementById('control-form')
            .reset();

            document.getElementById('control-id').value = '';

            document.getElementById('save-control-button').textContent =
                'Save Control';

        loadChildControls();
        loadChildHistory();

    } catch (error) {

        console.error('Error:', error);

    }
}


////lOAD HISTORY
async function loadChildHistory() {
    const params = new URLSearchParams(window.location.search);
    const identification = params.get('id');

    if (!identification) {
        console.error('Child identification is missing');
        return;
    }

    try {
        const response =
            await fetch(`/api/children/${identification}/history`);

        if (!response.ok) {
            throw new Error('Failed to load child history');
        }

        const history = await response.json();

        console.log('Child history received from JOIN:', history);

    } catch (error) {
        console.error('Error:', error);
    }
}
async function createChild() {

    const identification =
        document.getElementById('identification').value.trim();

    if (!identification) {
        alert('Identification is required');
        return;
    }

    try {

        const checkResponse =
            await fetch(`/api/children/${identification}`);

        if (checkResponse.ok) {
            alert('A child with this identification already exists');
            return;
        }

        if (checkResponse.status !== 404) {
            throw new Error('Failed to verify identification');
        }

        const gender =
            document.querySelector('input[name="gender"]:checked');

        const child = {

            identification: identification,

            firstName:
                document.getElementById('first-name').value,

            lastName:
                document.getElementById('last-name').value,

            birthDate:
                document.getElementById('birth-date').value,

            gender:
                gender ? gender.value : null,

            familyHistory:
                document.getElementById('family-history').value,

            personalHistory:
                document.getElementById('personal-history').value
        };

        const response = await fetch('/api/children', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(child)

        });

        if (!response.ok) {
            throw new Error('Failed to create child');
        }

        const savedChild = await response.json();

        console.log('Child saved:', savedChild);

        alert('Child saved successfully');

        document
            .getElementById('child-form')
            .reset();

        loadChildren();

    } catch (error) {

        console.error('Error:', error);

    }
}
async function selectControl(id) {

    console.log('Control selected:', id);

    try {

        const response = await fetch(`/api/controls/${id}`);

        if (!response.ok) {
            throw new Error('Failed to load control');
        }

        const control = await response.json();

        console.log('Control received:', control);


        document.getElementById('control-id').value = control.id;
        console.log('Editing control ID:', control.id);
        console.log('Hidden field value:', document.getElementById('control-id').value);
        document.getElementById('save-control-button').textContent =
            'Update Control';

        document.getElementById('control-date').value =
            control.controlDate || '';

        document.getElementById('weight').value =
            control.weight ?? '';

        document.getElementById('height').value =
            control.height ?? '';

        document.getElementById('head-circumference').value =
            control.headCircumference ?? '';

        document.getElementById('thoracic-circumference').value =
            control.thoracicCircumference ?? '';

        document.getElementById('abdominal-circumference').value =
            control.abdominalCircumference ?? '';

        document.getElementById('heart-rate').value =
            control.heartRate ?? '';

        document.getElementById('respiratory-rate').value =
            control.respiratoryRate ?? '';

        document.getElementById('oxygen-saturation').value =
            control.oxygenSaturation ?? '';

        document.getElementById('temperature').value =
            control.temperature ?? '';

        document.getElementById('hemoglobin').value =
            control.hemoglobin ?? '';

        document.getElementById('diet').value =
            control.diet ?? '';

        document.getElementById('meals-per-day').value =
            control.mealsPerDay ?? '';

        console.log('Control loaded into form');

    } catch (error) {

        console.error('Error:', error);

    }
}


async function deleteControl(id) {

    console.log('Control selected for deletion:', id);

    const confirmed =
        confirm('Are you sure you want to delete this control?');

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(`/api/controls/${id}`, {
                method: 'DELETE'
            });

        if (!response.ok) {
            throw new Error('Failed to delete control');
        }

        console.log('Control deleted:', id);

        alert('Control deleted successfully');

        loadChildControls();
        loadChildHistory();

    } catch (error) {

        console.error('Error:', error);

    }
}















