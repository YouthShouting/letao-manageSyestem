
<template>
  <div class="login">
    <el-form :model="loginForm" class="container" :rules="loginRules" ref="loginRef">
      <el-form-item>
        <div class="avatar">
          <img src="../assets/avator.png" alt="头像">
        </div>
      </el-form-item>
      <el-form-item prop="username">
        <!-- 查看input组件如何添加图标，prefix-icon属性添加前缀 -->
        <el-input v-model="loginForm.username"></el-input><span class="iconfont users">&#xe63e;</span>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" @keyup.enter.native="handleLogin"></el-input><span class="iconfont key">&#xe76e;</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 导入登录接口
import { login } from '@/api/index.js'
export default {
  data () {
    return {
      loginForm: {
        // 定义form表单需要的数据
        username: 'root',
        password: ''
      },
      // 校验用户名和密码--element-ui那有相关插件
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }

    }
  },
  methods: {
    handleLogin () {
      // isOk是布尔值
      // this.$refs.loginRef获取dom元素 validate（）方法传一个回调
      this.$refs.loginRef.validate(isOk => {
        if (isOk) {
          login(this.loginForm.username, this.loginForm.password)
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                this.$message.success('登录成功')
                // 登录成功就跳转到首页
                this.$router.push({ name: 'home' })
              } else {
                console.log('eer')
                // 给出错误提示信息
                this.$message.error('正确的用户名或密码不对')
              }
            })
        } else {
          this.$message.error('请提交正确的信息')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scope>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url('../assets/login-bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size:1920px 1473px;
.iconfont{
  position: absolute;
    top: 0px;
    left: 10px;
    font-size: 20px;
    }
.el-input__inner{
  text-indent: 25px;
}
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
