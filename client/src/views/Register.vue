<template>
    <div class="register">
        <section class="form-container">
            <div class="manage-tip">
                <span class="title">后台管理</span>
            </div>
            <el-form
                :model="registerUser"
                :rules="rules"
                class="registerForm"
                ref="registerForm"
                label-width="80px"
            >
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registerUser.password" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input v-model="registerUser.password2" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="选择身份">
                    <el-select v-model="registerUser.identity" placeholder="请选择身份">
                        <el-option label="管理员" value="manager"></el-option>
                        <el-option label="员工" value="employee"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit-btn" @click="submitForm('registerForm')">注册</el-button>
                </el-form-item>
            </el-form>
        </section> 
    </div>
</template>
<script>
import Qs from 'qs';
export default {
    name:"register",
    data(){
        //正则自定义验证
        let nameRule1 = (rule, value, callback)=>{
            let regExp = /[#$@/\\()<>{}[\] ]/g;
            if(regExp.test(value)){
                callback(new Error('不能有特殊字符'))
            }else{
                callback();
            }
        }
        //验证密码是否相同
        let validatePass2 = (rule, value, callback) => {
            if(value !== this.registerUser.password){
                callback(new Error('两次输入不一致'))
            }else{
                callback();
            }
        }
        return{
             registerUser: {
                name: "",
                email: "",
                password: "",
                password2: "",
                identity: ""
            },
            rules:{
                //定义name验证规则
                name:[
                    {required:true,message:'用户名不能为空',trigger:'change'},
                    {min:2,max:30,message:"长度2-30个字符",trigger:'blur'},
                    {validator:nameRule1,trigger:'blur'}
                ],
                email:[
                    {type:'email',required:true,message:'邮箱格式不正确',trigger:"blur"}
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'},
                    {min:6,max:30,message:"长度6-30个字符",trigger:'blur'},
                ],
                password2: [
                    { required: true, message: "确认密码不能为空", trigger: "blur" },
                    { min: 6,max: 30,message: "长度在 6 到 30 个字符",trigger: "blur"},
                    { validator: validatePass2, trigger: "blur" }
                ]
            }
        }
    },
    methods: {
       submitForm(formName){
           //是否验证正确
           this.$refs[formName].validate(valid=>{
               if(valid){
                   //默认是application/json格式
                   //axios bug 需要qs拼接下 再返回给 request认识的形式 name=xx&age=xxx
                   this.$axios
                   .post("/api/users/register", Qs.stringify(this.registerUser))
                   .then(res => {
                       //注册成功
                       this.$message({
                           message:'注册成功',
                           type:'success'
                       });
                       this.$router.push('/login');
                   })
               }else{
                   console.log('valid error!');
                   return false;
               }
           })
       } 
    },

}
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form-container{
    width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>