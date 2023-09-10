import React, { useState, useEffect } from 'react';
import { getEvidentlyBanner, sendClickEvidentlyMetric } from './aws/cloudwatch';
import { useNavigate } from 'react-router-dom';

const min = 1;
const max = 100000;
const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
const userId = randomNumber.toString();

function Banner() {
  const [bannerData, setBannerData] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [showContinueButton, setShowContinueButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getBanner();
  }, []);

  const getBanner = async () => {
    const banner = await getEvidentlyBanner(userId);

    setBannerData(banner)
  }

  const handleButtonClick = () => {
    sendClickEvidentlyMetric(userId);
    navigate('/questions');
    // Actualiza el mensaje de confirmación
 //   setConfirmationMessage('¡La información se ha enviado con éxito!');
    // Oculta el botón de "Continuar"
 //   setShowContinueButton(false);
  };

  return (
    <div className="contend">
      <div className='banner-image'>
        <img height={400} width={300} src={bannerData} />
        <div className='banner-description'>
          <h3>Perfilate</h3>
          <p>Conoce tu perfil como inversionista y empiza a invertir con GBM</p>
          <button className='banner-button' onClick={handleButtonClick}>Continuar 🡲</button>
        </div>
      </div>
      <br />
      {showContinueButton && (
        <div>
        </div>
      )}
      {confirmationMessage && (
        <div>
          <div className="success-message">
            <p>{confirmationMessage}</p>
          </div>

          <br />
          <button onClick={() => window.location.reload()}>Recargar</button>
        </div>
      )}
    </div>
  );
}

export default Banner;
