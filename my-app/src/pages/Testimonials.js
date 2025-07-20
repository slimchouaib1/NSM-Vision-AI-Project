import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import testimonialsBackground from './assets/image/testimonials-bg.jpg';
import teamImage1 from './assets/image/team/team-1.jpg';
import teamImage2 from './assets/image/team/team-2.jpg';
import teamImage3 from './assets/image/team/team-3.jpg';


const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials section dark-background">
      <img src={testimonialsBackground} className="testimonials-bg" alt="Testimonials Background" />
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          loop={true}
          speed={600}
          autoplay={{ delay: 5000 }}
          slidesPerView="auto"
          pagination={{ clickable: true, type: 'bullets' }}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }} 
        >
          <SwiperSlide>
            <div className="testimonial-item">
              <img src={teamImage1} className="testimonial-img" alt="Saul Goodman" />
              <h3>Slim Chouaib</h3>
              <h4>Data Scientist</h4>
              <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <p>
                <i className="bi bi-quote quote-icon-left"></i>
                <span>The secret of success is to do the common thing uncommonly well.</span>
                <i className="bi bi-quote quote-icon-right"></i>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-item">
              <img src={teamImage2} className="testimonial-img" alt="Sara Wilsson" />
              <h3>Nour Houda Zaabi</h3>
              <h4>Data Scientist</h4>
              <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <p>
                <i className="bi bi-quote quote-icon-left"></i>
                <span>It does not matter how slowly you go as long as you do not stop.</span>
                <i className="bi bi-quote quote-icon-right"></i>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-item">
              <img src={teamImage3} className="testimonial-img" alt="Jena Karlis" />
              <h3>Mohamed Ali Bouhadja</h3>
              <h4>Data Scientist</h4>
              <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <p>
                <i className="bi bi-quote quote-icon-left"></i>
                <span>Success is getting what you want. Happiness is wanting what you get.</span>
                <i className="bi bi-quote quote-icon-right"></i>
              </p>
            </div>
          </SwiperSlide>
          
          
          {/* Boutons de navigation */}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          
          {/* Pagination */}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
