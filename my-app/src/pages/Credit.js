import axios from 'axios';

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

function Credit() {
  useEffect(() => {
    document.title = "NSM_VISION - Credit Application";
    AOS.init();
    AOS.refresh();
  }, []);

const [formData, setFormData] = useState({
  person_age: "",
  person_gender: "",
  person_education: "",
  person_income: "",
  person_emp_exp: "",
  person_home_ownership: "",
  loan_amnt: "",
  loan_intent: "",
  loan_int_rate: "",
  loan_percent_income: "",
  cb_person_cred_hist_length: "",
  credit_score: "",
  previous_loan_defaults_on_file: "",
});



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Utilisateur non connecté.");
    return;
  }

  try {
    const response =await axios.post("http://localhost:8000/api/demandes/", formData, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
});


    alert("✅ Crédit soumis avec succès !");
    console.log(response.data);
  } catch (error) {
    console.error("❌ Erreur d'envoi :", error.response?.data || error.message);
    alert("Échec de l'envoi");
  }
};

console.log("FormData envoyé :", formData);

  return (
    <div className="index-page">
      {/* Header */}
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="/" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename">NSMVISION</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="/Home">Home</a></li>
              <li><a href="#credit-form" className="active">Credit</a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a className="cta-btn" href="#credit-form">Apply for Credit</a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero section dark-background">
        <img src={heroImage} alt="Hero" />
        <div className="container d-flex flex-column align-items-center">
          <h2 data-aos="fade-up" data-aos-delay="100">Credit Application</h2>
          <p data-aos="fade-up" data-aos-delay="200">
            Fill out the form to submit your credit request.
          </p>
        </div>
      </section>

<section id="credit-form" className="credit-form section">
  <div className="container">
    <div className="container section-title" data-aos="fade-up">
      <h2>Credit Application</h2>
      <p>Apply for a New Loan</p>
    </div>

    <div className="card shadow-lg p-4 rounded">
      <form onSubmit={handleSubmit} className="row g-3">

        {/* Age */}
        <div className="col-md-6">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="person_age"
            value={formData.person_age}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="col-md-6">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="person_gender"
            value={formData.person_gender}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Education Level */}
        <div className="col-md-6">
          <label className="form-label">Highest Education</label>
          <select
            className="form-select"
            name="person_education"
            value={formData.person_education}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="High School">High School</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="Associate">Associate</option>
          </select>
        </div>

        {/* Annual Income */}
        <div className="col-md-6">
          <label className="form-label">Annual Income (€)</label>
          <input
            type="number"
            className="form-control"
            name="person_income"
            value={formData.person_income}
            onChange={handleChange}
            required
          />
        </div>

        {/* Employment Experience */}
        <div className="col-md-6">
          <label className="form-label">Employment Experience (Years)</label>
          <input
            type="number"
            className="form-control"
            name="person_emp_exp"
            value={formData.person_emp_exp}
            onChange={handleChange}
            required
          />
        </div>

        {/* Home Ownership */}
        <div className="col-md-6">
          <label className="form-label">Home Ownership Status</label>
          <select
            className="form-select"
            name="person_home_ownership"
            value={formData.person_home_ownership}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="rent">Rent</option>
            <option value="own">Own</option>
            <option value="mortgage">Mortgage</option>
          </select>
        </div>

        {/* Loan Amount */}
        <div className="col-md-6">
          <label className="form-label">Loan Amount Requested </label>
          <input
            type="number"
            className="form-control"
            name="loan_amnt"
            value={formData.loan_amnt}
            onChange={handleChange}
            required
          />
        </div>

        {/* Loan Purpose */}
        <div className="col-md-6">
          <label className="form-label">Purpose of the Loan</label>
          <select
            className="form-select"
            name="loan_intent"
            value={formData.loan_intent}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="EDUCATION">EDUCATION</option>
            <option value="VENTURE">VENTURE</option>
            <option value="PERSONAL">PERSONAL</option>
            <option value="MEDICAL">MEDICAL</option>
            <option value="DEBTCONSOLIDATION">DEBTCONSOLIDATION</option>
          </select>
        </div>

        {/* Interest Rate */}
        <div className="col-md-6">
          <label className="form-label">Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="loan_int_rate"
            value={formData.loan_int_rate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Loan as % of Income */}
        <div className="col-md-6">
          <label className="form-label">Loan as % of Income</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="loan_percent_income"
            value={formData.loan_percent_income}
            onChange={handleChange}
            required
          />
        </div>

        {/* Credit History Length */}
        <div className="col-md-6">
          <label className="form-label">Credit History Length (Years)</label>
          <input
            type="number"
            className="form-control"
            name="cb_person_cred_hist_length"
            value={formData.cb_person_cred_hist_length}
            onChange={handleChange}
            required
          />
        </div>

        {/* Credit Score */}
        <div className="col-md-6">
          <label className="form-label">Credit Score</label>
          <input
            type="number"
            className="form-control"
            name="credit_score"
            value={formData.credit_score}
            onChange={handleChange}
            required
          />
        </div>

        {/* Previous Loan Defaults */}
        <div className="col-md-6">
          <label className="form-label">Previous Loan Defaults</label>
          <select
            className="form-select"
            name="previous_loan_defaults_on_file"
            value={formData.previous_loan_defaults_on_file}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-md-12 text-center">
          <button type="submit" className="btn btn-primary">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer id="footer" className="footer dark-background">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="/" className="logo d-flex align-items-center">
                <span className="sitename">NSMVISION</span>
              </a>
              <div className="footer-contact pt-3">
                <p>08 Rue Newton, Ariana 2088</p>
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

export default Credit;
