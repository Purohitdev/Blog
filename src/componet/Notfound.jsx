import React from 'react'
import { Container } from 'react-bootstrap'

function Notfound() {
  return (
    <Container>
      <div className="main">
        <div className="inx">
          <h1>
            Not Found
          </h1>
          <p>
            there are nothing like this.. check ur url</p>
        </div>
      </div>
    </Container>
  )
}

export default Notfound