import React from 'react';

import Header from './HeaderNo';
import Breadcrumbs from './Breadcrumbs'

import Expedientes from './Repo/TBL/tblbitacora';

const Bitacoras = () => 
{
    return(

<div>
<Header />
<Breadcrumbs />
      <center><h1>BITÁCORA</h1></center>
      <Expedientes />
    </div>
  );
};

export default Bitacoras;