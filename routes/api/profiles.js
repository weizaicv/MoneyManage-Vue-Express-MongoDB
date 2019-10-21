const express =  require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');

router.get('/test',(req, res, next)=>{
    res.json({
        msg:'test success'
    })
})

// @route POST api/profiles/add
// @desc 创建信息接口
// @access private
router.post(
    "/add",
    passport.authenticate('jwt',{ session: false}),
    (req, res, next)=>{
        const profileFields = {};

        if (req.body.type) profileFields.type = req.body.type;
        if (req.body.describe) profileFields.describe = req.body.describe;
        if (req.body.income) profileFields.income = req.body.income;
        if (req.body.expend) profileFields.expend = req.body.expend;
        if (req.body.cash) profileFields.cash = req.body.cash;
        if (req.body.remark) profileFields.remark = req.body.remark;
        
        new Profile(profileFields)
        .save()
        .then(profile=>{
            return res.json(profile);
        })
    }
)

// @route POST api/profiles/
// @desc 获取所有信息
// @access private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile
        .find()
        .then(profile => {

            if (profile.length==0) {
                res.status(404).json('没有任何内容');
            }else{
                res.json(profile);
            }

            //不加上return 会继续执行 res.json(profile); 
            if (profile.length==0) {
                res.status(404).json('没有任何内容');
            }
            res.json(profile);


        })
        .catch(err =>res.status(404).json(err))
    }
)

// @route POST api/profiles/:id
// @desc 获取单个信息
// @access private
router.get(
    '/:id',
    passport.authenticate('jwt',{ session: false }),
    (req, res) => {
        Profile
        .findOne({ _id: req.param.id })
        .then(profile =>{
            if (!profile) {
                return res.status(404).json('没有任何内容');
            }
            res.json(profile);
        })
        .catch(err =>res.status(404).json(err))
    }
)

// @route POST api/profiles/edit
// @desc 获取单个信息
// @access 编辑信息接口
router.post(
    '/edit/:id',
    passport.authenticate('jwt',{ session: false}),
    (req, res) => {
        const profileFields = {};
        if (req.body.type) profileFields.type = req.body.type;
        if (req.body.describe) profileFields.describe = req.body.describe;
        if (req.body.income) profileFields.income = req.body.income;
        if (req.body.expend) profileFields.expend = req.body.expend;
        if (req.body.cash) profileFields.cash = req.body.cash;
        if (req.body.remark) profileFields.remark = req.body.remark;
        // 查找更新后的数据 加上 {new:true}
        Profile
        .findOneAndUpdate(
            {id: req.param.id},
            {$set:profileFields},
            {new:true}
        ).then(profile => res.json(profile));
    }
)

// @route POST api/profiles/delete/:id
// @desc 删除信息接口
// @access Private
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile
        .findOneAndRemove({_id:req.params.id})
        .then(()=>{
            res.json('删除成功')
        })
        .catch(err => res.status(404).json('删除失败!'));
    }

)


module.exports = router;