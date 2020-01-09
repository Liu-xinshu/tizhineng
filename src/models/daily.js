import {daily} from '@/api'
import { stat } from 'fs';
export default {

    namespace: 'daily',
  
    state: {
        
        data:null
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *getData({time},{call,put}){
          let res = yield call(daily,{time});
          yield put({
              type:'setState',
              data:res.data
          })
      }
    },
  
    reducers: {
        setState(state,{data}){
            return {
                ...state,
                data
            }
        }
    }
  
  };
  