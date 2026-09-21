async function loadChildren() {
    try {
        const response = await fetch('/api/children');

        if (!response.ok) {
            throw new Error('Failed to load children');
        }

        const children = await response.json();

        console.log('Children received from Spring Boot:', children);

        const list = document.getElementById('children-list');

        children.forEach(child => {
            const childElement = document.createElement('p');

            childElement.textContent =
                `${child.identification} - ${child.firstName} ${child.lastName}`;

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