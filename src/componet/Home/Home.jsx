import React from 'react'
import { useNavigate } from 'react-router-dom'
import Backpage from './Backpage'

function Home() {
  const navigate=useNavigate()
  return (
   <div className='abc'>
     <div className='visbale'>
     <div className="div">
     <div>
     <p className='out-p'>All Blogs</p>
     <h1>Blogs.</h1>
     </div>
     </div>
      <Backpage/>
    </div>
   </div>
  )
}

export default Home