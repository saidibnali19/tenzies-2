import React from 'react'

export default function Die({label, isHeld, holdDice}) {
  return (
    <button className={isHeld ? "button bg-accent-300" : "button bg-light"} onClick={holdDice} >{label}</button>
  )
}
