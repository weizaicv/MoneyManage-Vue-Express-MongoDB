// login register
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const gravator = require('gravatar');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
// const gravator = require('gravatar');
// @route GET api/user/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res, next) => {
    res.json({
        msg: 'login works'
    })
})

//register
router.post('/register', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(400).json('邮箱已经被注册')
            } else {
                res.header("Access-Control-Allow-Headers", "Content-Type");
                const avatar = gravator.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                //保存数据
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity,
                });
                console.log(req.body)
                console.log(newUser)
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
})


//返回token jwt
router.post("/login", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    //查询
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: '用户不存在' })
            }
            //密码匹配 参数：当前密码 数据库密码
            //返回token
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    
                    if (isMatch) {
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        }
                        // playload：签发的 token 里面要包含的一些数据。
                        // secret：签发 token 用的密钥，在验证 token 的时候同样需要用到这个密钥。
                        // options：一些其它的选项。
                        jwt.sign(rule,keys.secretOrKey,{expiresIn:36000},(err,token)=>{
                            if(err) console.log(err)
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                    } else {
                        //400表示传参错误
                        return res.status(400).json({ password: '密码错误' })
                    }
                })
        })
})

// @route GET api/user/current
// @desc return current user
// @access private
//passport passport-jwt
//passpart.js设置 use passport中间件了
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


module.exports = router;