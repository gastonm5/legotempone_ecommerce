import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../../src/styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src="/img/logohp.png" alt="Logo" />
          <p className="country">🌍 Argentina</p>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h4>QUIÉNES SOMOS</h4>
            <ul>
              <li>The TempoLego Group</li>
              <li>Noticias TEMPOLEGO®</li>
              <li>Sostenibilidad</li>
              <li>Transparencia</li>
              <li>Certificación de productos</li>
              <li>Empleo</li>
              <li>TEMPOLEGO Compliance Line</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>ATENCIÓN AL CLIENTE</h4>
            <ul>
              <li>Contacto</li>
              <li>Instrucciones</li>
              <li>Piezas de repuesto</li>
              <li>Envíos y devoluciones</li>
              <li>Métodos de pago</li>
              <li>Términos y condiciones</li>
              <li>Productos retirados</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>ATRACCIONES</h4>
            <ul>
              <li>TEMPOLEGO® House</li>
              <li>TEMPOLEGOLAND® Parks</li>
              <li>Discovery Centers</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>MÁS INFORMACIÓN</h4>
            <ul>
              <li>TEMPOLEGO® Magazine (GRATIS)</li>
              <li>TEMPOLEGO Education</li>
              <li>TEMPOLEGO Ideas</li>
              <li>TEMPOLEGO Foundation</li>
              <li>Ofertas para estudiantes</li>
              <li>Programa para socios</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="newsletter">
          <h4>SUSCRÍBETE AL CORREO ELECTRÓNICO DE TEMPOLEGO® SHOP</h4>
          <div className="newsletter-input">
            <input type="email" placeholder="Tu dirección de correo electrónico" />
            <button>→</button>
          </div>
        </div>

        <div className="social-media">
          <h4>SÍGUENOS</h4>
          <div className="icons">
            <FaFacebookF />
            <FaXTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <ul>
          <li>Política de privacidad</li>
          <li>Cookies</li>
          <li>Aviso legal</li>
          <li>Cláusulas de uso</li>
          <li>Accesibilidad</li>
          <li>Configuración de cookies</li>
        </ul>
        <p>
          LEGO System A/S, DK-7190 Billund, Dinamarca. El uso de este sitio supone la aceptación de las cláusulas de uso.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
