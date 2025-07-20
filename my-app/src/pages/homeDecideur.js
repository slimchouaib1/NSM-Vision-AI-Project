/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/aos/aos.css';
import './assets/vendor/glightbox/css/glightbox.min.css';
import './assets/vendor/swiper/swiper-bundle.min.css';
import './assets/css/main.css';
import heroImage from './assets/image/hero.jpg';
import aboutImage from './assets/image/about.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import aboutImage2 from './assets/image/about-2.jpg';  // Assure-toi du bon chemin vers ton image
import serviceImage1 from './assets/image/services-1.jpg';
import serviceImage2 from './assets/image/services-2.jpg';
import serviceImage3 from './assets/image/services-3.jpg';

import clientImage1 from './assets/image/clients/client-1.png';
import clientImage2 from './assets/image/clients/client-2.png';
import clientImage3 from './assets/image/clients/client-3.png';
import clientImage4 from './assets/image/clients/client-4.png';
import clientImage5 from './assets/image/clients/client-5.png';
import clientImage6 from './assets/image/clients/client-6.png';

import workingImage1 from './assets/image/working-1.jpg';
import workingImage2 from './assets/image/working-2.jpg';
import workingImage3 from './assets/image/working-3.jpg';
import workingImage4 from './assets/image/working-4.jpg';


import Testimonials from "./Testimonials";
import teamImage1 from './assets/image/team/team-1.jpg';
import teamImage2 from './assets/image/team/team-2.jpg';
import teamImage3 from './assets/image/team/team-3.jpg';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function HomeDecideur() {
useEffect(() => {
  document.title = "NSM_VISION";
  AOS.init(); 
  AOS.refresh(); 

}, []);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const navigate = useNavigate();

  return (
    <div className="index-page">
      {/* Header */}
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="/dec" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename">NSMVISION</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="#hero" className="active">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <Link to="/dashbordDec" className="cta-btn">Dashbord</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero section dark-background">
      <img src={heroImage} alt="Hero" />
      <div className="container d-flex flex-column align-items-center">
        <h2 data-aos="fade-up" data-aos-delay="100">See Beyond Data</h2>
        <p data-aos="fade-up" data-aos-delay="200">
          We are a team of talented engineering students making a difference
        </p>
        <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
          {/* Updated Button to Navigate to Credit Page */}
          <button onClick={() => navigate("/dashbordDec")} className="btn-get-started">
          Dashbord
          </button>
          <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox btn-watch-video d-flex align-items-center">
            <i className="bi bi-play-circle"></i><span>Watch Video</span>
          </a>
        </div>
      </div>
    </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <h3>About NSM VISION</h3>
              <img src={aboutImage} className="img-fluid rounded-4 mb-4" alt="" />
              <p>
              NSM VISION is a cutting-edge platform designed to simplify and optimize credit management for clients. Our goal is to provide a seamless, secure, and intelligent financial experience, making loan applications, tracking, and repayments easier than ever.
              </p>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="250">
              <div className="content ps-0 ps-lg-5">
                <h3>Our Mission</h3>
                <ul>
                  <li><i className="bi bi-check-circle-fill"></i> Simplify the credit process with user-friendly tools and automation.</li>
                  <li><i className="bi bi-check-circle-fill"></i> Ensure financial accessibility by offering personalized loan options.</li>
                  <li><i className="bi bi-check-circle-fill"></i> Enhance security and trust through cutting-edge data protection.</li>
                  <li><i className="bi bi-check-circle-fill"></i> ESupport financial growth with real-time insights and expert guidance.</li>
                </ul>
                <p>
                At NSM VISION, we strive to empower individuals and businesses with accessible, transparent, and efficient credit solutions. We leverage technology and data-driven insights to help our clients make informed financial decisions while ensuring a fast and secure loan management process.
              </p>

              <div class="position-relative mt-4">
              <img src={aboutImage2} className="img-fluid rounded-4" alt="About Image 2" />
              <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" class="glightbox pulsating-play-btn"></a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
    <section id="stats" class="stats section light-background">

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-4">

          <div class="col-lg-3 col-md-6">
            <div class="stats-item d-flex align-items-center w-100 h-100">
              <i class="bi bi-emoji-smile color-blue flex-shrink-0"></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter"></span>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="stats-item d-flex align-items-center w-100 h-100">
              <i class="bi bi-journal-richtext color-orange flex-shrink-0"></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" class="purecounter"></span>
                <p>Projects</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="stats-item d-flex align-items-center w-100 h-100">
              <i class="bi bi-headset color-green flex-shrink-0"></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" class="purecounter"></span>
                <p>Hours Of Support</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="stats-item d-flex align-items-center w-100 h-100">
              <i class="bi bi-people color-pink flex-shrink-0"></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" class="purecounter"></span>
                <p>Hard Workers</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>

    {/* Services Section */}
<section id="services" className="services section">

<div className="container section-title" data-aos="fade-up">
  <h2>Services</h2>
  <p>Featured Services<br /></p>
</div>

<div className="container" data-aos="fade-up" data-aos-delay="100">

  <div className="row gy-5">

    <div className="col-xl-4 col-md-6" data-aos="zoom-in" data-aos-delay="200">
      <div className="service-item">
        <div className="img">
          <img src={serviceImage1} className="img-fluid" alt="Service 1" />
        </div>
        <div className="details position-relative">
          <div className="icon">
            <i className="bi bi-activity"></i>
          </div>
          <a href="service-details.html" className="stretched-link">
            <h3>Easy Loan Simulator</h3>
          </a>
          <p>Get a quick estimate of your monthly payments and find the best loan option for you—simple, fast, and 100% online!</p>
        </div>
      </div>
    </div>

    <div className="col-xl-4 col-md-6" data-aos="zoom-in" data-aos-delay="300">
      <div className="service-item">
        <div className="img">
          <img src={serviceImage2} className="img-fluid" alt="Service 2" />
        </div>
        <div className="details position-relative">
          <div className="icon">
            <i className="bi bi-broadcast"></i>
          </div>
          <a href="service-details.html" className="stretched-link">
            <h3>Smart Credit Evaluation</h3>
          </a>
          <p>Know your eligibility instantly! Our system analyzes your financial profile and gives you a personalized credit score.
          </p>
        </div>
      </div>
    </div>

    <div className="col-xl-4 col-md-6" data-aos="zoom-in" data-aos-delay="400">
      <div className="service-item">
        <div className="img">
          <img src={serviceImage3} className="img-fluid" alt="Service 3" />
        </div>
        <div className="details position-relative">
          <div className="icon">
            <i className="bi bi-easel"></i>
          </div>
          <a href="service-details.html" className="stretched-link">
            <h3>Fast & Secure Loan Management</h3>
          </a>
          <p>Track your loan application, manage your payments, and stay updated—all in one secure and user-friendly platform.</p>
        </div>
      </div>
    </div>

  </div>

</div>

</section>

{/*service2*/}
<section id="services-2" class="services-2 section light-background">

  <div class="container section-title" data-aos="fade-up">
    <h2>Services</h2>
    <p>Vérifiez nos services</p>
  </div>

  <div class="container">

    <div class="row gy-4">

      <div class="col-md-6" data-aos="fade-up" data-aos-delay="100">
        <div class="service-item d-flex position-relative h-100">
          <i class="bi bi-briefcase icon flex-shrink-0"></i>
          <div>
            <h4 class="title"><a href="#" class="stretched-link">Real-Time Tracking</a></h4>
            <p class="description">Check the status of your loan application anytime and receive instant updates.
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6" data-aos="fade-up" data-aos-delay="200">
        <div class="service-item d-flex position-relative h-100">
          <i class="bi bi-card-checklist icon flex-shrink-0"></i>
          <div>
            <h4 class="title"><a href="#" class="stretched-link">Flexible Payment Options</a></h4>
            <p class="description">Repay your loan easily with multiple payment methods tailored to your needs.
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6" data-aos="fade-up" data-aos-delay="300">
        <div class="service-item d-flex position-relative h-100">
          <i class="bi bi-bar-chart icon flex-shrink-0"></i>
          <div>
            <h4 class="title"><a href="#" class="stretched-link">Reminders & Notifications</a></h4>
            <p class="description">Never miss a due date with personalized SMS and email alerts.</p>
          </div>
        </div>
      </div>

      <div class="col-md-6" data-aos="fade-up" data-aos-delay="400">
        <div class="service-item d-flex position-relative h-100">
          <i class="bi bi-binoculars icon flex-shrink-0"></i>
          <div>
            <h4 class="title"><a href="#" class="stretched-link"> Personalized Assistance</a></h4>
            <p class="description">Get support from a dedicated advisor to guide you through your loan application and answer all your questions.</p>
          </div>
        </div>
      </div>

      <div class="col-md-6" data-aos="fade-up" data-aos-delay="500">
        <div class="service-item d-flex position-relative h-100">
          <i class="bi bi-brightness-high icon flex-shrink-0"></i>
          <div>
            <h4 class="title"><a href="#" class="stretched-link">Financial Dashboard</a></h4>
            <p class="description">View your loans, payments, and due dates at a glance with a clear and intuitive interface.</p>
          </div>
        </div>
      </div>

      <div class="col-md-6" data-aos="fade-up" data-aos-delay="600">
        <div class="service-item d-flex position-relative h-100">
          <i class="bi bi-calendar4-week icon flex-shrink-0"></i>
          <div>
            <h4 class="title"><a href="#" class="stretched-link">Security & Data Protection</a></h4>
            <p class="description">Enjoy a secure platform with advanced protection for your personal and financial information.</p>
          </div>
        </div>
      </div>

    </div>

  </div>

</section>


<Testimonials />

<section id="team" className="team section light-background">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Team</h2>
        <p>CHECK OUR TEAM</p>
      </div>

      <div className="container">
        <div className="row gy-5">

          {/* Team Member 1 */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="member">
              <div className="pic">
                <img src={teamImage1} className="img-fluid" alt="Walter White" />
              </div>
              <div className="member-info">
                <h4>Slim Chouaib</h4>
                <span>Data Scientist</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter-x"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="member">
              <div className="pic">
                <img src={teamImage2} className="img-fluid" alt="Sarah Jhonson" />
              </div>
              <div className="member-info">
                <h4>Nour Houda Zaabi</h4>
                <span>Data Scientist</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter-x"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="member">
              <div className="pic">
                <img src={teamImage3} className="img-fluid" alt="William Anderson" />
              </div>
              <div className="member-info">
                <h4>Mohamed Ali Bouhadja</h4>
                <span>Data Scientist</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter-x"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>Contact Us</p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="row gy-4">
                <div className="col-lg-12">
                  <div className="info-item d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-geo-alt"></i>
                    <h3>Address</h3>
                    <p> 08 Rue Newton, Ariana 2088, Tek-Up</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-item d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-telephone"></i>
                    <h3>Call Us</h3>
                    <p>+216 555 881 92</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-item d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-envelope"></i>
                    <h3>Email Us</h3>
                    <p>nsm.vision1@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form onSubmit={handleSubmit} className="php-email-form">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input type="text" name="name" className="form-control" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" name="email" className="form-control" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-md-12">
                    <input type="text" name="subject" className="form-control" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                  </div>
                  <div className="col-md-12">
                    <textarea className="form-control" name="message" rows="4" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
       {/* Footer Section */}
       <footer id="footer" className="footer dark-background">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="/" className="logo d-flex align-items-center">
                <span className="sitename">NSMVISION</span>
              </a>
              <div className="footer-contact pt-3">
                <p> 08 Rue Newton, Ariana 2088</p>
                <p>Tek-Up</p>
                <p className="mt-3"><strong>Phone:</strong> +216 555 881 92</p>
                <p><strong>Email:</strong> nsm.vision1@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        
      </footer>
    </div>
  );
}

export default HomeDecideur;
