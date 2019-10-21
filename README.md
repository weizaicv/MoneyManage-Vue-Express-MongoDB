# Node.js-Express Mongose Vue-MoneyManage 

#### 介绍
express vue vuecli3.0 mongose实现的小的资金管理项目，包含权限认证

在.herokuapp.com使用free server

mongodb cloud使用free database

[https://money-manage-01.herokuapp.com](https://money-manage-01.herokuapp.com/)



# jwt

+ json web token

+ 流程

  - 1.引入所需要的包 passport passport-jwt  jsonwebtoken

  - 2.login成功，返回token，jwt.sign生成token

  - ```json
    token:组成
    // header
    {
    	"alg":"HS256",
    	"type":"JWT"
    }
    // payload
    {
        "id":1,
        "name":"weizai",
        "email":"1",
        "identity":"employee"
    }
    ```

  - 3.验证token接口之前的准备工作

    ```javascript
    //server.js 初始化passport中间件
    app.use(passport.initialize());
    require('./config/passport')(passport);
    
    //passport.js 
    const JwtStrategy = require('passport-jwt').Strategy,
          ExtractJwt = require('passport-jwt').ExtractJwt;
    const mongoose = require('mongoose');
    const User = mongoose.model('users');
    const keys = require('./keys');
    
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = keys.secretOrKey;
    
    module.exports = passport => {
        passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
            User.findById(jwt_payload.id)
                .then(user=>{
                    if(user){
                        return done(null,user);
                    }
                    return done(null,false);
                })
                .catch(err=>console.log(err))
        }))
    }
    ```
  
  - 4.验证接口调用验证功能  passport.authenticate('jwt',{ session: false})
  
  - ```javascript
    router.get(
        "/current",
        passport.authenticate('jwt',{ session: false}),
        (req, res, next)=>{
            res.json({
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                identity: req.user.identity
            })
        }
    )
    ```
  
    

# vue-cli3.0

****

**配置herokuapp**

1.gmail注册

2.create app

3.下载 heroku cli

4.根据Deploy上传git路径

```bash
//要先配置ssh
heroku keys:add
git push heroku master
```

#几个注意点
1.前后端连调整
出现Bug 跨域问题 需要更新下server端代码保存下

axios
默认header:
Content-Type: application/json;charset=UTF-8
需要请求拦截里面改为：
Content-Type: application/x-www-form-urlencoded; charset=utf-8
后端才能通过
req.body接受到数据
否则只能通过
req.on

Content-Type: application/json ： 请求体中的数据会以json字符串的形式发送到后端
Content-Type: application/x-www-form-urlencoded：请求体中的数据会以普通表单形式（键值对）发送到后端
Content-Type: multipart/form-data： 它会将请求体的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。

# 前端

Node-express搭建服务器

>目录 
>
>client 客户端
>
>config 配置数据库，passport验证
>
>models 数据表配置
>
>routes/api 接口
>
>server.js 服务端入口



Node-连接mongodb数据库

> config/keys.js 存放数据库配置信息
>
> ```javascript
> //server.js  
> mongoose.connect()
> ```



Node-搭建路由和数据模型

> routes/api 下面两个路由 user.js profile.js
>
> ```javascript
> //user.js profile.js
> //接口规范
> // @route GET api/user/test
> // @desc 返回请求的json数据
> // @access public
> router.get('/test',(req,res,next)=>{
>     res.json({msg:'test'})
> })
> router.post()
> 
> ```

>models 下面两个数据模型 Profile.js User.js
>
>```javascript
>const mongoose = require('mongoose');
>const Schema = mongoose.Schema;
>const UserSchema = new Schema({})
>module.exports = User = mongoose.model('user',UserSchema)
>```



Node-搭建注册接口并存储数据

> /register
>
> findOne先查是否已经保存过，注册的密码需要bcrypt加密密码



Node-使用全球公认头像gravatar

> wordpress注册之后，固定邮箱返回固定头像



Node-搭建登录接口,jwt实现token

> 登录的时候验证密码 bcrypt.compare
>
> 返回token给前端（前端保存在localStorage中）
>
> jwt.sign(payload,secret,options)
>
> // playload：签发的 token 里面要包含的一些数据。
>
> // secret：签发 token 用的密钥，在验证 token 的时候同样需要用到这个密钥。
>
> // options：一些其它的选项。
>
> token: "Bearer " + token //jwt必须加上Bearer



Node-使用passport-jwt验证token

> config下面的 passport.js验证
>
> ```javascript
> //passport.js
> passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
> 	//jwt_payload为签名token jwt.sign的时候配置的返回值
> 	return done(null,user);//表示passport验证成功
> })
> ```
>
> 在server.js中需要配置下才能使用中间件验证
>
> ```javascript
> // passport 初始化
> app.use(passport.initialize());
> require('./config/passport')(passport);
> ```
>
> 其他接口使用user passport中间件验证权限
>
> （配合前端使用请求拦截，设置config.headers.Authorization = localStorage.eleToken;）
>
> ```
> router.get("/current",
> 	passport.authenticate('jwt',{ session: false}),
> 	(req, res, next) => {
> 		...
> 	}
> )
> ```
>
> 这样就能判断有没有登录 是否可以获取数据等操作



Node-添加，编辑，删除，获取信息接口

```javascript
//需要增加中间件去验证请求是否合法
passport.authenticate('jwt', { session: false })
findOne()
findOneAndUpdate()
findOneAndRemove()
save()
```



VueCli3.x全栈项目-前后端连载

> client中 package.json
>
> ```
> "start": "npm run serve"
> ```
>
> server中 concurrently库进行联调
>
> ```
> "client-install":"npm install --prefix client",
> "client":"npm start --prefix client",
> "server": "nodemon server.js",
> "dev":"concurrently \"npm run server\" \"npm run client\"" 
> ```
>
> 这样启动npm run dev就可以同时启动client server



VueCli3.x全栈项目-设置Register和404组件

> el-form > el-form-item > el-input , el-select|el-option
>
> el-form重要属性 :model="registerUser"  :rules ="rules " 
>
> registerUser定义了表单项目的v-model属性
>
> rules 定义了验证规则
>
> ```
> rules:{
> 	name:[{required:true,message:'用户名不能为空',trigger:'change'},{},{}],
> 	email:[{},{}]
> }
> ```
>
> 提交（附带验证）
>
> ```
> submitForm(formName){
> 	this.$refs[formName].validate(valid=>{})
> }
> ```



VueCli3.x全栈项目-加载动画和消息提醒，路由守卫，token过期处理

```javascript
//请求拦截 http.js
axios.interceptors.request.use(config=>{
    //设置header 将token放入 headers.Authorization
    //方便后端进行passport-jwt验证
})
axios.interceptors.response.use(response=>{
    //token过期处理
    //过期or错误需要删除无效的localStorage里面保存的token
})
```



VueCli3.x全栈项目-实现登录页面获取token解析并且储存在vuex中

```javascript
//axios结合post 需要将数据qs.stringify一下
//axios默认格式是application/json跟后端需要的application/www-form-urlencoded不一致
//登录成功->jwt-decode解析token->储存token->跳转

const {token} = res.data;
localStorage.setItem('eleToken',token);
const decode = jwt_decode(token);
this.$store.dispatch("setIsAutnenticated",this.isEmpty(decode));
this.$store.dispatch("setUser",decode);
```



VueCli3.x全栈项目-设计顶部导航,下拉菜单,首页和个人信息,左侧导航栏

```
//属于组件
HeadNav
LeftNav
logout需要调用vuex里面的action clearCurrentStatus清除vuex状态，localStorage清除eleToken
```



VueCli3.x全栈项目-展示资金管理页面

> 增删查改 分页 权限 筛选
>
> el-table > el-table-column (如果是自定义的需要template-slot-scope自定义)
>
> 增加和修改是同一个操作，先点击触发el-dialog
>
> el-dialog二次封装 FoundList为父 DialogFound为子，传递参数进行配置dialog的属性，option属性传入表示add or edit
>
> 列表展示，先获取后台接口数据，再进行渲染到data->this.tableData
>
> tableData保存当前渲染到页面的数据	allTableData保存一次性获取后台的数据	filterTableData保存筛选之后的数据
>
> handleCurrentChange(page) 根据传入的当前页码，判断之前已经有多少数据sortNum，allTableData里面filter index >= sortNum找出之后的数据，filter size找出当前页面的数据
>
> handleSizeChange(page_size)
>
>  
>
> 时间筛选插件 el-datepicker
>
> this.search_data.startTime	this.search_data.endTime
>
> 格式化之后filterTableData找出时间范围的数据



VueCli3.x全栈项目-打包上线项目

