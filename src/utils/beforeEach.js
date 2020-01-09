import routes from '../router/routerConfig'
import {message} from 'antd';
function find(path){
    let obj = {};
    function unfold(data){
        data.forEach(item=>{
            if(item.path===path){
                return obj = item;
            }else if(item.children){
                unfold(item.children);
            }else{
                return ;
            }
        })
    }
    unfold(routes);
    return obj;
   
}
export default function ({location,push,goBack},n){
        const path = location.pathname;
        setTimeout(()=>{
           let  list = n.state.navList;

            let flag = list.find(item=>item.path===path);
            if(!flag){
                // message.warning('没有该权限',1,()=>{
                    
                // });
                // goBack()
            }
        },)
        if(find(path).meta && find(path).meta.islogin){//需要守卫   
            if(window.localStorage.data && true){
                let {time} = window.localStorage.data && JSON.parse(window.localStorage.data);
                let curTime = new Date().getTime();//当前时间     
                if((curTime/1000)>time){//过期了
                    window.localStorage.removeItem('data');
                    message.warning('登录信息已过期！请重新登陆',1,()=>{
                        push('/login');//去登陆
                    });
                }
            }else{
                push('/login');//去登陆
            }

        }
    
}