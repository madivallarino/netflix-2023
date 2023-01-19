import React from 'react'
import "./Banner.css"

function Banner() {
  return (
    <header className='banner' style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://res.cloudinary.com/practicaldev/image/fetch/s--THrf5Yjw--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n6brz4p7iq7j1mulo1nv.jpg')`,
        backgroundPosition: "center center",
    }}>
        <img />
    </header>
  )
}

export default Banner