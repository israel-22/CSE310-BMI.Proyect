function ControlList({
    controls,
    onEdit,
    onDelete
}) {

    if (controls.length === 0) {
        return <p>No controls recorded.</p>
    }
return (
    <div className="control-list">

        {controls.map(control => (

            <div
                key={control.id}
                className="control-card"
            >

                <div className="control-information">

                    <p>
                        <strong>Control Date:</strong>{' '}
                        {control.controlDate}
                    </p>

                    <p>
                        <strong>Weight:</strong>{' '}
                        {control.weight} kg
                    </p>

                    <p>
                        <strong>Height:</strong>{' '}
                        {control.height} cm
                    </p>

                    <p>
                        <strong>BMI:</strong>{' '}
                        {control.bmi}
                    </p>

                    <p>
                        <strong>Head Circumference:</strong>{' '}
                        {control.headCircumference} cm
                    </p>

                    <p>
                        <strong>Thoracic Circumference:</strong>{' '}
                        {control.thoracicCircumference} cm
                    </p>

                    <p>
                        <strong>Abdominal Circumference:</strong>{' '}
                        {control.abdominalCircumference} cm
                    </p>

                    <p>
                        <strong>Heart Rate:</strong>{' '}
                        {control.heartRate} bpm
                    </p>

                    <p>
                        <strong>Respiratory Rate:</strong>{' '}
                        {control.respiratoryRate} breaths/min
                    </p>

                    <p>
                        <strong>Oxygen Saturation:</strong>{' '}
                        {control.oxygenSaturation}%
                    </p>

                    <p>
                        <strong>Temperature:</strong>{' '}
                        {control.temperature} °C
                    </p>

                    <p>
                        <strong>Hemoglobin:</strong>{' '}
                        {control.hemoglobin} g/dL
                    </p>

                    <p>
                        <strong>Diet:</strong>{' '}
                        {control.diet}
                    </p>

                    <p>
                        <strong>Meals per Day:</strong>{' '}
                        {control.mealsPerDay}
                    </p>

                    <p>
                        <strong>Weight for Age:</strong>{' '}
                        {control.weightForAgeResult}
                    </p>

                    <p>
                        <strong>Height for Age:</strong>{' '}
                        {control.heightForAgeResult}
                    </p>

                    <p>
                        <strong>BMI for Age:</strong>{' '}
                        {control.bmiForAgeResult}
                    </p>

                </div>


                <div className="control-actions">

                    <button
                        type="button"
                        className="button-edit"
                        onClick={() => onEdit(control.id)}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        className="button-delete"
                        onClick={() => onDelete(control.id)}
                    >
                        Delete
                    </button>

                </div>

            </div>

        ))}

    </div>
)
}
export default ControlList