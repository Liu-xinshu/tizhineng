import {getData,downloadFn,upload,deleteData,addData,exportPart} from '@/api'
import { stat } from 'fs';
export default {

    namespace: 'homeCheck',
  
    state: {
        data:[],//初始化
        size:0,
        limit:8,
        pageid:0

    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({},{call,put,select}){
        let {pageid,limit}= yield select(state=>state.homeCheck);
        let res = yield call(getData,{
          pageid,
          limit
        })
        yield put({type:'setdata',data:res.data})
      },
      *download(payload,{call,put,select}){
          let res = yield call(downloadFn);
          let tagA = document.createElement('a');
          tagA.setAttribute('href',URL.createObjectURL(res));
          tagA.setAttribute('download',"test.xlsx");
          tagA.click();
          tagA.remove();
      },
      *changefile({FormData},{call,put}){
          yield call(upload,FormData);
          yield put({type:"fetch"})
         
      },
      //删除
      *del({id},{call,put}){
         id = JSON.stringify(id);
         yield call(deleteData,{id});
         yield put({type:"fetch"})
      },
      //添加
      *add({obj},{call,put}){
        yield call(addData,{...obj})
        yield put({type:"fetch"})
      },
      //导出部分数据
      *exportPART({data},{call,put}){
        data = JSON.stringify(data);
        let res = yield call(exportPart,data);
        let tagA = document.createElement('a');
        tagA.setAttribute('href',URL.createObjectURL(res));
        tagA.setAttribute('download',"test.xlsx");
        tagA.click();
        tagA.remove();
      }
    },
  
    reducers: {
        setdata(state,{data}){
          return {
            ...state,
            data:data.data.map((item,key)=>{
              item.key=key;
              return item
            }),
            size:data.size
          }
           

        },
        changePageid(state,{pageid}){
          return {
            ...state,
            pageid:pageid-1
          }
        }
    },
  
  };
  