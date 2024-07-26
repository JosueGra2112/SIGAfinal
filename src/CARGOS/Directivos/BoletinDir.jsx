import React from 'react';

import Header from './HeaderDic';
import Menu from './MenuDic';


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