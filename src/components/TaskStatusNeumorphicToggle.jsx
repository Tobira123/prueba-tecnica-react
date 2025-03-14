import React from 'react'
import './TaskStatusNeumorphicToggle.css'

export default function TaskStatusNeumorphicToggle({ checked, onChange, labelChecked, labelUnchecked }) {


  return (
    <label className="toggle-label-task">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div className="slider-task"></div>

      <span className="toggle-text">
        {checked ? labelChecked : labelUnchecked}
      </span>
    </label>
  )
}
