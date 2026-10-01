export async function getChildren() {

    const response = await fetch('/api/children');

    if (!response.ok) {
        throw new Error('Failed to load children');
    }

    return await response.json();
}
export async function getChild(identification) {

    const response = await fetch(`/api/children/${identification}`);

    if (!response.ok) {
        throw new Error('Failed to load child');
    }

    return await response.json();
}
export async function getChildControls(identification) {

    const response = await fetch(
        `/api/children/${identification}/controls`
    )

    if (!response.ok) {
        throw new Error('Failed to load child controls')
    }

    return await response.json()
}
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
export async function getControl(id) {

    const response = await fetch(`/api/controls/${id}`)

    if (!response.ok) {
        throw new Error('Failed to load control')
    }

    return await response.json()
}

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
export async function deleteControl(id) {

    const response = await fetch(`/api/controls/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error('Failed to delete control')
    }
}
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