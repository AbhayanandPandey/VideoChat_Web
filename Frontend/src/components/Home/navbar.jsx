import React from 'react'

const navbar = () => {
  return (
    <div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">ShopingZone</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav gap-2 text-center mt-2 p-2">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Portfolio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
            <li class="nav-item dropdown  px-3">
              <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Account
              </button>
              <ul class="dropdown-menu dropdown-menu-end w-50" style={{marginLeft: "25%"}}> 
                <li><a class="dropdown-item" href="/Login">Login</a></li>
                <li><a class="dropdown-item" href="/Signup">Signup</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default navbar
