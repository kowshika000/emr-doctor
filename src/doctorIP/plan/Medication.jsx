import React from 'react'
import DisplayMedication from '../assessmentData.jsx/components/medication/displayMedication'

const Medication = ({patientId}) => (
  <div className='full-screen-scrollable'>
    <DisplayMedication patientId={patientId} />
  </div>
)

export default Medication