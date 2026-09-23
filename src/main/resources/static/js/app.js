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

     if(!identification){
         console.error('Child identification is missing');
         return;
     }
     try{
         const response = await fetch(`/api/children/${identification}/controls`);

         if(!response.ok){
             throw new Error('Failed to load child controls');
         }
         const controls = await response.json();
         console.log('Controls received from Spring Boot:', controls);
         const list = document.getElementById('controls-list');
         list.innerHTML='';

          controls.forEach(control =>{
              const controlElement = document.createElement('div');
              controlElement.innerHTML=`
              <p>
               <strong>Date:</strong> ${control.controlDate}
               <br>
               <strong>Weight:</strong> ${control.weight} kg
               <br>
               <strong>Height:</strong> ${control.height} cm
               <br>
               <strong>BMI:</strong> ${control.bmi}
               </p>
               <hr>
              `;
     list.appendChild(controlElement);
          });

     }catch(error){
         console.error('Error:', error);
     }

}

async function createControl() {
    const params = new URLSearchParams(window.location.search);
    const identification = params.get('id');

    if (!identification) {
        console.error('Child identification is missing');
        return;
    }

    const control = {
        controlDate: document.getElementById('control-date').value,
        weight: parseFloat(document.getElementById('weight').value),
        height: parseFloat(document.getElementById('height').value),
        child: {
            identification: identification
        }
    };

    try {
        const response = await fetch('/api/controls', {
            method: 'POST',
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

        document.getElementById('control-form').reset();

        loadChildControls();

    } catch (error) {
        console.error('Error:', error);
    }
}



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

        document.getElementById('child-form').reset();

        loadChildren();

    } catch (error) {

        console.error('Error:', error);

    }
}




















