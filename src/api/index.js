import request from '@/utils/request'
//登陆
export const login = (params)=>request.post('/user/login',params);

//获取全部数据

export const getData = (query)=>request.get('/management/alldata',query);

//下载初始模板

export const downloadFn = ()=>request.post('/management/exportXlsx/original',{
    responseType:'blob'
});

//导入

export const upload = (data)=>request.post('/management/importXlsx',data);

//首页考勤

export const checkWork = (data)=>request.get('/home/checkWork',data);

//首页日报

export const daily = (data)=>request.get('/home/daily',data);

//首页客服

export const client = (data)=>request.get('/home/daily',data);

//首页活动数据

export const activedate = (data)=>request.get('/home/activeData',data);

//删除

export const deleteData = (data)=>request.post('/management/removedata',data);

//新增

export const addData = (data)=>request.post('/management/adddata',data);


//导出部分数据

export const exportPart = (data)=>request.post('/management/exportXlsx/data',{
    data,
    responseType:'blob'
});