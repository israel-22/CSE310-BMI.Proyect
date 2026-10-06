import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
       getChild,
       getChildControls,
       getControl,
       deleteControl
} from '../services/api'
import ControlForm from '../components/ControlForm'
import ControlList from '../components/ControlList'
import GrowthChart from '../components/GrowthChart'

function ChildRecord() {

    const [searchParams] = useSearchParams()
    const identification = searchParams.get('id')

    const [child, setChild] = useState(null)
    const [controls, setControls] = useState([])
    const [editingControl, setEditingControl] = useState(null)

    useEffect(() => {

        async function loadData() {

            try {

                const childData = await getChild(identification)
                const controlsData = await getChildControls(identification)

                setChild(childData)
                setControls(controlsData)

            } catch (error) {
                console.error('Error loading child record:', error)
            }

        }

        if (identification) {
            loadData()
        }

    }, [identification])

    if (!child) {
        return <p>Loading child...</p>
    }

return (
    <main className="child-record-page">

        <section className="child-record-header">

            <div className="page-heading">
                <h1>Child Record</h1>
                <p>Growth monitoring and health information</p>
            </div>

            <div className="child-information-card">

                <div className="child-information-item">
                    <span className="information-label">
                        Identification
                    </span>

                    <span className="information-value">
                        {child.identification}
                    </span>
                </div>

                <div className="child-information-item">
                    <span className="information-label">
                        First Name
                    </span>

                    <span className="information-value">
                        {child.firstName}
                    </span>
                </div>

                <div className="child-information-item">
                    <span className="information-label">
                        Last Name
                    </span>

                    <span className="information-value">
                        {child.lastName}
                    </span>
                </div>

                <div className="child-information-item">
                    <span className="information-label">
                        Birth Date
                    </span>

                    <span className="information-value">
                        {child.birthDate}
                    </span>
                </div>

                <div className="child-information-item">
                    <span className="information-label">
                        Gender
                    </span>

                    <span className="information-value">
                        {child.gender}
                    </span>
                </div>

            </div>

            <div className="report-action">

                <button
                    type="button"
                    className="button-primary"
                    onClick={() => {
                        window.open(
                            `/api/children/${child.identification}/report`,
                            '_blank'
                        )
                    }}
                >
                    Generate PDF Report
                </button>

            </div>

        </section>


        <section className="control-form-section">

            <div className="section-heading">
                <h2>New Control</h2>
            </div>

            <ControlForm
                key={editingControl?.id ?? 'new-control'}
                identification={identification}
                editingControl={editingControl}
                onControlCreated={savedControl => {
                    setControls(previousControls => {

                        const exists = previousControls.some(
                            control =>
                                String(control.id) ===
                                String(savedControl.id)
                        )

                        if (exists) {

                            return previousControls.map(control =>
                                String(control.id) ===
                                String(savedControl.id)
                                    ? savedControl
                                    : control
                            )

                        }

                        return [
                            ...previousControls,
                            savedControl
                        ]

                    })
                }}
            />

        </section>


        <section className="controls-section">

            <div className="section-heading">
                <h2>Controls</h2>
            </div>

            <ControlList
                controls={controls}

                onEdit={async controlId => {

                    try {

                        const selectedControl =
                            await getControl(controlId)

                        setEditingControl(selectedControl)

                    } catch (error) {

                        console.error(
                            'Error loading control:',
                            error
                        )

                    }

                }}

                onDelete={async controlId => {

                    try {

                        await deleteControl(controlId)

                        setControls(previousControls =>
                            previousControls.filter(
                                control =>
                                    String(control.id) !==
                                    String(controlId)
                            )
                        )

                    } catch (error) {

                        console.error(
                            'Error deleting control:',
                            error
                        )

                    }

                }}
            />

        </section>


        <section className="growth-charts-section">

            <div className="section-heading">
                <h2>Growth Charts</h2>
            </div>

            <GrowthChart
                child={child}
                controls={controls}
            />

        </section>

    </main>
)
}

export default ChildRecord