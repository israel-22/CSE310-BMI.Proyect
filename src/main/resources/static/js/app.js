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