const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const passport = require('passport');
const path = require('path');
//忽略提示
mongoose
.connect(db,{useNewUrlParser:true})
.then(()=>console.log('MongoDb connected'))
.catch(err=>console.log(err))

//bodyParser
app.use(bodyParser.urlencoded({extended:false}));

// passport 初始化
app.use(passport.initialize());
require('./config/passport')(passport);

//使用routes /api/users表示路由路径自动加上前缀
app.use('/api/users',users);
app.use('/api/profile', profiles);

//执行静态页面
// if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/dist'));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
    })
// }
console.log(process.env.NODE_ENV)

const port = process.env.PORT || 3333;

app.listen(port,()=>{
    console.log(`listen port ${port}`);
})
//mongodb+srv://root:weizai@cluster0-d4zsf.mongodb.net/test?retryWrites=true&w=majority