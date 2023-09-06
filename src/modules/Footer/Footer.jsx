import React from 'react'
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit'

export const Footer = () => {
  return (
    <MDBFooter className="text-center text-white Footer" style={{ backgroundColor: '#f1f1f1' }}>
      <MDBContainer className="pt-4">
        {/* <section className="mb-4">
          <MDBBtn
            rippleColor="dark"
            floating
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fab fa-facebook-f" />
          </MDBBtn>
        </section> */}
      </MDBContainer>

      <div className="text-center text-dark p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className="text-dark" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  )
}
