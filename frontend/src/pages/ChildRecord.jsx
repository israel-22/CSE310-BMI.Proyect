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
        <div>

            <h1>Child Record</h1>

            <p>
                <strong>Identification:</strong> {child.identification}
            </p>

            <p>
                <strong>First Name:</strong> {child.firstName}
            </p>

            <p>
                <strong>Last Name:</strong> {child.lastName}
            </p>

            <p>
                <strong>Birth Date:</strong> {child.birthDate}
            </p>

            <p>
                <strong>Gender:</strong> {child.gender}
            </p>

          <ControlForm
              key={editingControl?.id ?? 'new-control'}
              identification={identification}
              editingControl={editingControl}
              onControlCreated={savedControl => {
                  setControls(previousControls => {

                      const exists = previousControls.some(
                          control => control.id === savedControl.id
                      )

                      if (exists) {
                          return previousControls.map(control =>
                              control.id === savedControl.id
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


           <h2>Controls</h2>

           <ControlList
               controls={controls}

               onEdit={async controlId => {

                   try {

                       const selectedControl = await getControl(controlId)

                       setEditingControl(selectedControl)

                   } catch (error) {

                       console.error('Error loading control:', error)

                   }

               }}

               onDelete={async controlId => {

                   try {

                       await deleteControl(controlId)

                       setControls(previousControls =>
                           previousControls.filter(
                               control => control.id !== controlId
                           )
                       )

                   } catch (error) {

                       console.error('Error deleting control:', error)

                   }

               }}
           />
           <GrowthChart />





        </div>
    )
}

export default ChildRecord