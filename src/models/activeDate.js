import {activedate} from '@/api'
import { stat } from 'fs';
export default {

    namespace: 'activedate',
  
    state: {
        
        data:null
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *getData({month},{call,put}){
          month=month.toString()
          let res = yield call(activedate,{month});
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
                data:data.data
            }
        }
    }
  
  };
  