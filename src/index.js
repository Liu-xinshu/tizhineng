import dva from 'dva';
import './index.css';
import {createBrowserHistory as createHistory} from "history"
import '@/views/index/home/homeChild/index'
import loading from 'dva-loading'
// 1. Initialize
const app = dva({history:createHistory()});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
// app.model(require('./models/homeCheck').default);//考勤

// 4. Router
app.router(require('./router').default);
// let files = require.context('./models',false,/\.\/\w+\.js/)
// files.keys().forEach(item=>{
//     app.model(files(item)['default'])
//     console.log(files(item).default)
// })
// 5. Start
app.model(require('./models/homeCheck').default);
app.model(require('./models/checkwork').default);
app.model(require('./models/daily').default);
app.model(require('./models/client').default);
app.model(require('./models/activeDate').default);

app.use(loading());
app.start('#root');
