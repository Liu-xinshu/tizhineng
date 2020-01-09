import React from 'react';
import { Router} from 'dva/router';
import routes from './routerConfig';
import RouterView from './routerView';
export default({history})=>{
  return<Router history={history}>
      <RouterView routes={routes}/>
  </Router>
}