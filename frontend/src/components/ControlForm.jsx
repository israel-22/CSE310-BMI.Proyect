import { useState } from 'react'
import { createControl, updateControl } from '../services/api'

// Manages the growth control form and its input values.
function ControlForm({
identification,
editingControl,
onControlCreated,
onCancelEdit
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
const [headCircumference, setHeadCircumference] = useState(
    editingControl?.headCircumference ?? ''
)
const [thoracicCircumference, setThoracicCircumference] = useState(
    editingControl?.thoracicCircumference ?? ''
)
const [abdominalCircumference, setAbdominalCircumference] = useState(
    editingControl?.abdominalCircumference ?? ''
)
const [heartRate, setHeartRate] = useState(
    editingControl?.heartRate ?? ''
)
const [respiratoryRate, setRespiratoryRate] = useState(
    editingControl?.respiratoryRate ?? ''
)
const [oxygenSaturation, setOxygenSaturation] = useState(
    editingControl?.oxygenSaturation ?? ''
)
const [temperature, setTemperature] = useState(
    editingControl?.temperature ?? ''
)
const [hemoglobin, setHemoglobin] = useState(
    editingControl?.hemoglobin ?? ''
)
const [diet, setDiet] = useState(
    editingControl?.diet ?? ''
)
const [mealsPerDay, setMealsPerDay] = useState(
    editingControl?.mealsPerDay ?? ''
)

// Validates and submits the growth control data.
async function handleSubmit(event) {
    event.preventDefault()

    if (!controlDate) {
        alert('Control date is required')
        return
    }

    if (weight === '') {
        alert('Weight is required')
        return
    }

    if (height === '') {
        alert('Height is required')
        return
    }

    if (Number(weight) <= 0) {
        alert('Weight must be greater than zero')
        return
    }

    if (Number(height) <= 0) {
        alert('Height must be greater than zero')
        return
    }

    const control = {
        controlDate,
        weight: Number(weight),
        height: Number(height),
        headCircumference: Number(headCircumference),
        thoracicCircumference: Number(thoracicCircumference),
        abdominalCircumference: Number(abdominalCircumference),
        heartRate: Number(heartRate),
        respiratoryRate: Number(respiratoryRate),
        oxygenSaturation: Number(oxygenSaturation),
        temperature: Number(temperature),
        hemoglobin: Number(hemoglobin),
        diet,
        mealsPerDay: Number(mealsPerDay),
        child: {
            identification
        }
    }

    try {
        const savedControl = editingControl
            ? await updateControl(editingControl.id, control)
            : await createControl(control)

        onControlCreated(savedControl, Boolean(editingControl))

        setControlDate('')
        setWeight('')
        setHeight('')
        setHeadCircumference('')
        setThoracicCircumference('')
        setAbdominalCircumference('')
        setHeartRate('')
        setRespiratoryRate('')
        setOxygenSaturation('')
        setTemperature('')
        setHemoglobin('')
        setDiet('')
        setMealsPerDay('')

    } catch (error) {
        console.error('Error saving control:', error)
        alert('Could not save the growth control. Please try again.')
    }
}

return (
    <form
        className="control-form"
        onSubmit={handleSubmit}
    >
        <h2>{editingControl ? 'Edit Control' : 'New Control'}</h2>

        <div className="control-form-field">
            <label>Control Date</label>
            <input
                type="date"
                value={controlDate}
                onChange={event => setControlDate(event.target.value)}
                required
            />
        </div>

        <div className="control-form-field">
            <label>Weight (kg)</label>
            <input
                type="number"
                step="0.1"
                value={weight}
                onChange={event => setWeight(event.target.value)}
                required
            />
        </div>

        <div className="control-form-field">
            <label>Height (cm)</label>
            <input
                type="number"
                step="0.1"
                value={height}
                onChange={event => setHeight(event.target.value)}
                required
            />
        </div>

        <div className="control-form-field">
            <label>Head Circumference (cm)</label>
            <input
                type="number"
                step="0.1"
                value={headCircumference}
                onChange={event => setHeadCircumference(event.target.value)}
            />
        </div>

        <div className="control-form-field">
            <label>Thoracic Circumference (cm)</label>
            <input
                type="number"
                step="0.1"
                value={thoracicCircumference}
                onChange={event => setThoracicCircumference(event.target.value)}
            />
        </div>

        <div className="control-form-field">
            <label>Abdominal Circumference (cm)</label>
            <input
                type="number"
                step="0.1"
                value={abdominalCircumference}
                onChange={event => setAbdominalCircumference(event.target.value)}
            />
        </div>

        <div className="control-form-field">
            <label>Heart Rate (bpm)</label>
            <input
                type="number"
                value={heartRate}
                onChange={event => setHeartRate(event.target.value)}
            />
        </div>

        <div className="control-form-field">
            <label>Respiratory Rate (breaths/min)</label>
            <input
                type="number"
                value={respiratoryRate}
                onChange={event => setRespiratoryRate(event.target.value)}
            />
        </div>

        <div className="control-form-field">
            <label>Oxygen Saturation (%)</label>
            <input
                type="number"
                value={oxygenSaturation}
                onChange={event => setOxygenSaturation(event.target.value)}
            />
        </div>

        <div className="control-form-field">
            <label>Temperature (°C)</label>
            <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={event => setTemperature(event.target.value)}
            />
        </div>

        <div className="control-form-field">
            <label>Hemoglobin (g/dL)</label>
            <input
                type="number"
                step="0.1"
                value={hemoglobin}
                onChange={event => setHemoglobin(event.target.value)}
            />
        </div>

        <div className="control-form-field">
            <label>Diet</label>
            <select
                value={diet}
                onChange={event => setDiet(event.target.value)}
            >
                <option value="">Select diet</option>
                <option value="Hypercaloric">Hypercaloric</option>
                <option value="Hypocaloric">Hypocaloric</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Infant">Infant</option>
            </select>
        </div>

        <div className="control-form-field">
            <label>Meals per Day</label>
            <select
                value={mealsPerDay}
                onChange={event => setMealsPerDay(event.target.value)}
            >
                <option value="">Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>

       <div className="control-form-actions">
           <button
               type="submit"
               className="button-primary"
           >
               {editingControl ? 'Update Control' : 'Save Control'}
           </button>

           {editingControl && (
               <button
                   type="button"
                   className="button-cancel-edit"
                   onClick={onCancelEdit}
               >
                   Cancel Edit
               </button>
           )}
       </div>

    </form>
)


}

export default ControlForm
