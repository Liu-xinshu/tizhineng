import {client} from '@/api'
import { stat } from 'fs';
export default {

    namespace: 'client',
  
    state: {
        
        data:null
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *getData({time},{call,put}){
          let res = yield call(client,{time});
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
  