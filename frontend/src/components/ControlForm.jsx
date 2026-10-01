import { useState } from 'react'
import { createControl, updateControl } from '../services/api'

function ControlForm({
    identification,
    editingControl,
    onControlCreated
}) {

const [controlDate, setControlDate] = useState(
    editingControl?.controlDate ?? ''
)

const [weight, setWeight] = useState(
    editingControl?.weight ?? ''
)

const [height, setHeight] = useState(
    editingControl?.height ?? ''
)

    async function handleSubmit(event) {

        event.preventDefault()

        const control = {
            controlDate,
            weight: Number(weight),
            height: Number(height),
            child: {
                identification
            }
        }

        try {
            console.log('Editing control:', editingControl)

            const savedControl = editingControl
                ? await updateControl(editingControl.id, control)
                : await createControl(control)

            onControlCreated(savedControl)

            setControlDate('')
            setWeight('')
            setHeight('')

        } catch (error) {
            console.error('Error creating control:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <h2>New Control</h2>

            <div>
                <label>
                    Control Date
                </label>

                <input
                    type="date"
                    value={controlDate}
                    onChange={event => setControlDate(event.target.value)}
                    required
                />
            </div>

            <div>
                <label>
                    Weight (kg)
                </label>

                <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={event => setWeight(event.target.value)}
                    required
                />
            </div>

            <div>
                <label>
                    Height (cm)
                </label>

                <input
                    type="number"
                    step="0.1"
                    value={height}
                    onChange={event => setHeight(event.target.value)}
                    required
                />
            </div>

            <button type="submit">
                Save Control
            </button>

        </form>
    )
}

export default ControlForm