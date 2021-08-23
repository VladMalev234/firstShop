import React from 'react'
import { Alert } from 'react-bootstrap'
//сообщение при ошибку
const Message = ({variant, children}) => {
    return (
        <Alert variant={variant} >
            {children}
        </Alert>
    )
}
// дефолтные параметры, если они не переданы
Message.defaultProps = {
    variant: 'info'
}

export default Message
