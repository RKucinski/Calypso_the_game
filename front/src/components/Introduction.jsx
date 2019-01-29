import React from 'react';

import mascotte from '../assets/FinalLogo.png';
import '../css/Introduction.scss';

const Introduction = () => (
  <div>
    <img className="Mascotte" src={mascotte} alt="Logo : Mascotte" />
  </div>
);

export default Introduction;
