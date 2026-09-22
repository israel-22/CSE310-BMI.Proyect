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

        children.forEach(child => {
            const childElement = document.createElement('p');

            childElement.textContent =
                `${child.identification} - ${child.firstName} ${child.lastName}`;

            childElement.addEventListener('click', ()=>{
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
























