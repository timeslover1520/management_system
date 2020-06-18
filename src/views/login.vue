<template>
  <div class="login">
    <div class="left">
      <div class="top">
        <img src="../assets/img/login_logo.png" alt />
        <span>超级管理系统</span>
        <span>|</span>
        <span>欢迎登录</span>
      </div>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入电话"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span="18">
              <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="6">
              <img :src="baseUrl+'/captcha?type=login'" class="v_code" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="checked">
          <el-checkbox v-model="ruleForm.checked">我已阅读并同意</el-checkbox>
          <el-link type="primary" @click="user_Agreement">用户协议</el-link>和
          <el-link type="primary" @click="privacy_Policy">隐私条款</el-link>
        </el-form-item>

        <el-row>
          <el-col :span="24">
            <el-button type="primary" class="login_btn" @click="submitForm(ruleForm)">登录</el-button>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-button type="primary" class="login_btn" @click="resetForm(ruleForm)">重新填写</el-button>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="24">
            <el-button type="primary" class="login_btn" @click="$refs.reg.dialogVisible = true">注册</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <user_Agreement ref="user_Agreement"></user_Agreement>
    <privacy_Policy ref="privacy_Policy"></privacy_Policy>
    <register ref="reg"></register>
    <div class="right">2222222222</div>
  </div>
</template>

<script>
import register from "./register.vue";
export default {
  components: {
    register
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASRURL,
      dialogVisible: false,
      validate: "",
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        checked: []
      },
      rules: {
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 11, max: 11, message: "请正确输入", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 8, max: 16, message: "长度在8到16个字符", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请正确输入验证码", trigger: "blur" }
        ],
        checked: [
          {
            type: "array",
            required: true,
            message: "同意才可登录",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 注册框弹出判断
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(res => {
          done();
          window.console.log(res);
        })
        .catch(res => {
          window.console.log(res);
        });
    },
    // 登录表单提交
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("200成功");
        } else {
          alert("404失败");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang=less>
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  background-size: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    box-sizing: border-box;
    padding: 41px;
    .top {
      margin-bottom: 31px;
      img {
        width: 22px;
        height: 17px;
        margin-right: 11px;
      }
      span {
        font-size: 21px;
        font-weight: 800;
        margin-right: 11px;
        &:nth-child(3) {
          font-weight: 100;
        }
      }
    }
    .v_code {
      width: 110px;
      height: 42px;
    }
    .login_btn {
      width: 100%;
      margin-bottom: 26px;
    }
  }
}
</style>