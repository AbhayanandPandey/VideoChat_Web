import React from 'react'
import Navbar from '../Navbar/navbar'
import'bootstrap/dist/css/bootstrap.min.css'
import'bootstrap/dist/js/bootstrap.bundle.min.js'
import Footer from '../Footer/footer'
import Main from '../Main/main'
import { Link } from 'react-router-dom'
const home = () => {
  return (
    <>
        <Navbar />
        <Main />
        <Footer />
    </>
    
  )
}

export default home
