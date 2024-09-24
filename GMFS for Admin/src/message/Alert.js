import React  from 'react'
import Alert from '@mui/material/Alert';



export default function AlertBox(props) {


    return (
        <>
            {props.isTriggred === true && 
                
                    <Alert
                        severity={props.type}
                        sx={{  width: '100%' }}
                    >
                        {props.title}
                    </Alert>
            }
        </>

    )
}
