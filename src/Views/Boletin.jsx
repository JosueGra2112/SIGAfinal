import React from 'react';

import Header from './HeaderNo';

import Expedientes from './Repo/TBL/tblboletin';
import Breadcrumbs from './Breadcrumbs'

const Bitacoras = () => 
{
    return(

<div>
<Header />
<Breadcrumbs />
      <center><h1>BOLETÍN</h1></center>
      <Expedientes />
    </div>
  );
};

export default Bitacoras;