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

        if (!identification.trim()) {
            alert('Identification is required')
            return
        }

        if (!firstName.trim()) {
            alert('First name is required')
            return
        }

        if (!lastName.trim()) {
            alert('Last name is required')
            return
        }

        if (!birthDate) {
            alert('Birth date is required')
            return
        }

        if (!gender) {
            alert('Gender is required')
            return
        }

        const child = {
            identification: identification.trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            birthDate,
            gender,
            familyHistory: familyHistory.trim(),
            personalHistory: personalHistory.trim()
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
        <main className="children-page">

            <section className="page-heading">
                <h1>Children</h1>
                <p>Child registration and information</p>
            </section>


            <section className="child-form-section">

                <div className="section-heading">
                    <h2>New Child</h2>
                </div>


                <form
                    className="child-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-field">
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


                    <div className="form-field">
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


                    <div className="form-field">
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


                    <div className="form-field">
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


                    <div className="form-field gender-field">

                        <label>
                            Gender
                        </label>

                        <div className="gender-options">

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


                    <div className="form-field form-field-wide">
                        <label>
                            Family History
                        </label>

                        <textarea
                            value={familyHistory}
                            onChange={event => setFamilyHistory(event.target.value)}
                        />
                    </div>


                    <div className="form-field form-field-wide">
                        <label>
                            Personal History
                        </label>

                        <textarea
                            value={personalHistory}
                            onChange={event => setPersonalHistory(event.target.value)}
                        />
                    </div>


                    <div className="form-actions">

                        <button
                            className="button-primary"
                            type="submit"
                        >
                            Save Child
                        </button>


                        <button
                            className="button-edit"
                            type="button"
                            disabled={!editingChild}
                            onClick={handleUpdate}
                        >
                            Update Child
                        </button>


                        <button
                            className="button-delete"
                            type="button"
                            disabled={!editingChild}
                            onClick={handleDelete}
                        >
                            Delete Child
                        </button>

                    </div>

                </form>

            </section>


            <section className="children-list-section">

                <div className="section-heading">
                    <h2>Registered Children</h2>
                </div>


                <div className="children-list">

                    {children.map(child => (

                        <article
                            className="child-list-item"
                            key={child.identification}
                        >

                            <div
                                className="child-list-information"
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
                            >

                                <p className="child-identification">
                                    <strong>
                                        {child.identification}
                                    </strong>
                                </p>

                                <p className="child-name">
                                    {child.firstName} {child.lastName}
                                </p>

                                <p className="child-birth-date">
                                    {child.birthDate}
                                </p>

                            </div>


                            <Link
                                className="child-record-link"
                                to={`/child-record?id=${child.identification}`}
                            >
                                <button
                                    className="button-primary"
                                    type="button"
                                >
                                    Open Record
                                </button>
                            </Link>

                        </article>

                    ))}

                </div>

            </section>

        </main>
    )
}

export default Children