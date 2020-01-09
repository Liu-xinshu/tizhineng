import React from 'react'
import {Route,Switch,Redirect} from 'dva/router'
export default ({routes,path=""})=>{
    let RedirectArr=routes&&routes.filter(item=>item.to).map((item,index)=><Redirect from ={item.path} to={item.to} key={index}/>);
    let RouterArr=routes&&routes.filter(item=>!item.to);
    return <Switch>
        {RouterArr&&RouterArr.map((item,index)=>{
            if(item.path[0]!=='/'){
              item.path = [path,'/',item.path].join('')
            }
            return <Route key={index} path={item.path} render={(prop)=>{
                let allProps={...prop};
                return <item.component {...allProps} routes={item.children}/>
            }}/>
        }).concat(RedirectArr)}
    </Switch>
}