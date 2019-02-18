<template>
    <div class="login">
      <div class="login-bg"><img src="../assets/login-bg.png" alt=""></div>
      <el-card class="box-card">
          <div slot="header" class="clearfix">
              <span>乐淘后台管理系统</span>
          </div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                  <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input><span class="iconfont">&#xe63e;</span>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input><span class="iconfont">&#xe76e;</span>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn">提交</el-button>
                  <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
          </el-form>
      </el-card>
    </div>
</template>
<script>
import { login } from '@/api'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: 'root',
        pass: '123456'
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm.username, this.ruleForm.pass).then(res => {
            // console.log(res)
            if (res.data.success) {
              this.$message.success('登录成功')
              this.$router.push({ name: 'home' })
            } else {
              this.$message.error('用户名或密码不正确')
            }
          })
        } else {
          this.$message.error('请填写正确的信息')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      console.log(12)
    }
  }
}
</script>
<style lang="scss" scope>
.login{
    position: fixed;
    height: 100%;
    width: 100%;
    .login-bg{
        img{
          display: block;
          width: 100%;
        }
    }
 .box-card{
     position: absolute;
     width: 500px;
     top: 50%;
     left: 40%;
     transform: translateY(-60%);
 }
 .login-btn {
      width: 100%;
    }
}
</style>
