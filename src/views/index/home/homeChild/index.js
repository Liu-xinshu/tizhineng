let files = require.context('./',true,/\.\/\w+\/index\.js/);
let data = files.keys().map(item=>files(item).default).sort((a,b)=>a.key-b.key);



export default (role)=>{
    if(role==='主管')return data.filter(item=>item.key>2);
    return data;
}