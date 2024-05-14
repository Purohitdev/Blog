import React, { useRef } from 'react'
import Card from '../Home/Card'


function Backpage() {
    const ref=useRef(null)


    return (

        <>
            <div ref={ref}className='showw'>
                <Card reference={ref} />

            </div>
        </>
    )
}

export default Backpage