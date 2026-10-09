// Retrieves all registered children.
export async function getChildren() {

    const response = await fetch('/api/children');

    if (!response.ok) {
        throw new Error('Failed to load children');
    }

    return await response.json();
}

// Retrieves a child by identification number.
export async function getChild(identification) {

    const response = await fetch(`/api/children/${identification}`);

    if (!response.ok) {
        throw new Error('Failed to load child');
    }

    return await response.json();
}

// Retrieves the growth controls for a specific child.
export async function getChildControls(identification) {

    const response = await fetch(
        `/api/children/${identification}/controls`
    )

    if (!response.ok) {
        throw new Error('Failed to load child controls')
    }

    return await response.json()
}

// Creates a new growth control.
export async function createControl(control) {

    const response = await fetch('/api/controls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(control)
    })

    if (!response.ok) {
        throw new Error('Failed to create control')
    }

    return await response.json()
}

// Retrieves a growth control by its ID.
export async function getControl(id) {

    const response = await fetch(`/api/controls/${id}`)

    if (!response.ok) {
        throw new Error('Failed to load control')
    }

    return await response.json()
}

// Updates an existing growth control.
export async function updateControl(id, control) {

    const response = await fetch(`/api/controls/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(control)
    })

    if (!response.ok) {
        throw new Error('Failed to update control')
    }

    return await response.json()
}

// Deletes a growth control by its ID.
export async function deleteControl(id) {

    const response = await fetch(`/api/controls/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error('Failed to delete control')
    }
}

// Registers a new child.
export async function createChild(child) {

    const response = await fetch('/api/children', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(child)
    })

    if (!response.ok) {
        throw new Error('Failed to create child')
    }

    return await response.json()
}

// Updates a child's information.
export async function updateChild(identification, child) {

    const response = await fetch(`/api/children/${identification}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(child)
    })

    if (!response.ok) {
        throw new Error('Failed to update child')
    }

    return await response.json()
}

// Deletes a child by identification number.
export async function deleteChild(identification) {

    const response = await fetch(
        `/api/children/${identification}`,
        {
            method: 'DELETE'
        }
    )

    if (!response.ok) {
        throw new Error('Failed to delete child')
    }
}