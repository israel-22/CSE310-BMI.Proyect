import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getChildren, createChild, updateChild, deleteChild } from '../services/api'

function Children() {

    const [children, setChildren] = useState([])
    const [identification, setIdentification] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState('')
    const [familyHistory, setFamilyHistory] = useState('')
    const [personalHistory, setPersonalHistory] = useState('')
    const [editingChild, setEditingChild] = useState(null)

    useEffect(() => {

        async function loadChildren() {

            try {
                const data = await getChildren()
                setChildren(data)
            } catch (error) {
                console.error('Error loading children:', error)
            }

        }

        loadChildren()

    }, [])


    async function handleSubmit(event) {

        event.preventDefault()

        const child = {
            identification,
            firstName,
            lastName,
            birthDate,
            gender,
            familyHistory,
            personalHistory
        }

        try {

            const createdChild = await createChild(child)

            setChildren(previousChildren => [
                ...previousChildren,
                createdChild
            ])

            setIdentification('')
            setFirstName('')
            setLastName('')
            setBirthDate('')
            setGender('')
            setFamilyHistory('')
            setPersonalHistory('')

        } catch (error) {

            console.error('Error saving child:', error)

        }
    }


    async function handleUpdate() {

        if (!editingChild) {
            return
        }

        const child = {
            identification,
            firstName,
            lastName,
            birthDate,
            gender,
            familyHistory,
            personalHistory
        }

        try {

            const updatedChild = await updateChild(
                editingChild.identification,
                child
            )

            setChildren(previousChildren =>
                previousChildren.map(existingChild =>
                    existingChild.identification ===
                    updatedChild.identification
                        ? updatedChild
                        : existingChild
                )
            )

            setEditingChild(null)

            setIdentification('')
            setFirstName('')
            setLastName('')
            setBirthDate('')
            setGender('')
            setFamilyHistory('')
            setPersonalHistory('')

        } catch (error) {

            console.error('Error updating child:', error)

        }
    }

    async function handleDelete() {

        if (!editingChild) {
            return
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete child ${editingChild.identification}?`
        )

        if (!confirmed) {
            return
        }

        try {

            await deleteChild(editingChild.identification)

            setChildren(previousChildren =>
                previousChildren.filter(
                    child =>
                        child.identification !==
                        editingChild.identification
                )
            )

            setEditingChild(null)

            setIdentification('')
            setFirstName('')
            setLastName('')
            setBirthDate('')
            setGender('')
            setFamilyHistory('')
            setPersonalHistory('')

        } catch (error) {

            console.error('Error deleting child:', error)

        }
    }

    return (
        <div>
            <h1>Children</h1>
            <h2>New Child</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>
                        Identification
                    </label>

                    <input
                        type="text"
                        value={identification}
                        onChange={event => setIdentification(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>
                        First Name
                    </label>

                    <input
                        type="text"
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>
                        Last Name
                    </label>

                    <input
                        type="text"
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>
                        Birth Date
                    </label>

                    <input
                        type="date"
                        value={birthDate}
                        onChange={event => setBirthDate(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>
                        Gender
                    </label>

                    <div>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === 'Male'}
                                onChange={event => setGender(event.target.value)}
                                required
                            />
                            Male
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === 'Female'}
                                onChange={event => setGender(event.target.value)}
                            />
                            Female
                        </label>
                    </div>
                </div>

                <div>
                    <label>
                        Family History
                    </label>

                    <textarea
                        value={familyHistory}
                        onChange={event => setFamilyHistory(event.target.value)}
                    />
                </div>
                <div>
                    <label>
                        Personal History
                    </label>

                    <textarea
                        value={personalHistory}
                        onChange={event => setPersonalHistory(event.target.value)}
                    />
                </div>

                <button type="submit">
                    Save Child
                </button>
                <button
                    type="button"
                    disabled={!editingChild}
                    onClick={handleUpdate}
                >
                    Update Child
                </button>

                <button
                    type="button"
                    disabled={!editingChild}
                    onClick={handleDelete}
                >
                    Delete Child
                </button>

            </form>

            {children.map(child => (
                <div key={child.identification}>

                    <p
                    onClick={() => {
                        console.log(child)
                        setEditingChild(child)
                        setIdentification(child.identification)
                        setFirstName(child.firstName)
                        setLastName(child.lastName)
                        setBirthDate(child.birthDate ?? '')
                        setGender(child.gender ?? '')
                        setFamilyHistory(child.familyHistory ?? '')
                        setPersonalHistory(child.personalHistory ?? '')

                    }}

                        style={{ cursor: 'pointer' } }

                     >
                        <strong>{child.identification}</strong>
                        {' - '}
                        {child.firstName} {child.lastName}
                        {' - '}
                            {child.birthDate}
                    </p>

                    <Link to={`/child-record?id=${child.identification}`}>
                        <button type="button">
                            Open Record
                        </button>
                    </Link>

                    <hr />

                </div>
            ))}
        </div>
    )
}

export default Children