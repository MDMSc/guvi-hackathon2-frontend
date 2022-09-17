import React from 'react';
import './home.css';
import photo_img from '../../assets/photography.jpeg';
import music_img from '../../assets/music.jpeg';
import scooty_img from '../../assets/scooty.jpeg';
import BodyCard from './BodyCard';
import Header from '../header/Header';

export default function Home() {
  const services=[
    {
      title: "Photography Instruments",
      image: photo_img,
      summary: "Capture every moment of you life"
    },
    {
      title: "Musical Instruments",
      image: music_img,
      summary: "Fill you life with music"
    },
    {
      title: "Two-Wheelers",
      image: scooty_img,
      summary: "Ride the entire city"
    }
  ];

  return (
    <>
    <Header />
    <div className='container container-home'>
        <h1>Welcome to Equipment Rental Portal</h1>
        <h3>We provide renting services of a wide range of products</h3>

        <h2>Our Services</h2>
        <div className='container-cards'>
          {
            services.map((value, index) => (
              <div className='card' key={index}>
                <BodyCard title={value.title} image={value.image} summary={value.summary} />
              </div>
            )) 
          }
        </div>
        <h4>Browse our products through the <span className='emp'>Products</span> tab and Choose as per your need</h4>
    </div>
    </>
  )
}
