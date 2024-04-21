import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({url,heading}) {
  return (
    <Link to={url}>
        <p>{heading}</p>
    </Link>
  )
}
