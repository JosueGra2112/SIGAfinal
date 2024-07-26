import React from 'react';

import Header from './HeaderSe';
import Menu from './MenuAd';


import Expedientes from './TBL/tblboletin';

const Bitacoras = () => 
{
    return(

<div>
<Header />
      <Menu />
      <center><h1>BOLETÍN</h1></center>
      <Expedientes />
    </div>
  );
};

export default Bitacoras;