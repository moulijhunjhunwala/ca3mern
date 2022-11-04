import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorComponent = ({variant = 'info', children}) => {
  return (
    <Alert variant={variant} style={{fontSize: "20px"}}>
        <strong>{children}</strong>
    </Alert>
  )
}

export default ErrorComponent