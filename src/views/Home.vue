<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="avator-container"><img class="avator" src="../assets/avator.png" alt=""><div class="name">张学友</div></div>
        <div class="navs">
          <el-menu
            unique-opened
            default-active="2"
             class="el-menu-admin"
            @open="handleOpen"
            router
            @close="handleClose"
            background-color="#2f4050"
            text-color="#fff"
            :collapse="isCollapse">
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
             <el-submenu index="category">
               <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">分类管理</span>
               </template>
               <el-menu-item index="firstCategory">一级分类管理</el-menu-item>
               <el-menu-item index="secondCategory">二级分类管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="proManage">
              <i class="el-icon-document"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <span class="iconfont people" @click="handleToggle">&#xe65d;</span>
          <div class="system-title">乐淘后台管理系统</div>
          <div class="loginOut"  @click="exept">
            <span class="iconfont out">&#xe631;</span>
            退出
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { loginOut } from '@/api'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    exept () {
      loginOut().then(res => {
        // console.log(res)
        if (res.status === 200) {
          // 退出成功跳转到登录页面
          this.$router.push({ name: 'login' })
        }
      })
    },

    handleToggle () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="scss" scope>
.home{
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container{
      height: 100%;
    .el-aside{
      background-color: rgb(47, 64, 80);
      .avator-container{
      background-color: rgb(36, 52, 67);
        width: 200px;
        overflow: hidden;
        margin-bottom: 10px;
        padding-bottom: 20px;
        .avator{
          display: inline-block;
          margin: 20px 45px 5px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 1px solid rgb(90, 73, 31);
        }
        .name{
          text-align: center;
          font-size: 20px;
          color: #a9b0c2;
        }
      }
      .navs{
        margin: 10px 0;
      }
    }
    .el-menu {
      border-right: none;
    }
    .el-header{
      position: relative;
      background-color: rgb(255, 255, 255);
      padding-top: 13px;
      .people{
        cursor: pointer;
        font-size: 35px;
        color:rgb(255, 120, 0);
      }
      .system-title{
        position: absolute;
        top: 16px;
        left: 40%;
        font-size: 25px;
        color: #3c3a3a;
      }
      .loginOut{
        cursor: pointer;
        color: rgb(51, 122, 183);
        position: absolute;
        right: 30px;
        top: 25px;
        &:hover {
      color: rgb(255, 114, 0);
    }
      }
    }
    .el-main{
      background-color: rgb(245, 247, 250);
      padding: 30px 10px;
    }
  }
  }
</style>
