<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="600px"
    :show-close="false"
    :center="true"
    :hide-required-asterisk=true
  >
    <!-- 标题 -->
    <div class="titleInfo" slot="title">用户注册</div>

    <el-form
      :model="registerForm"
      :rules="regRules"
      ref="registerForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <!-- 头像图标 -->

      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/uploads'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="phone">
        <el-input v-model="registerForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password"></el-input>
      </el-form-item>

      <el-form-item label="图形码" prop="reg_v_code">
        <el-row>
          <el-col :span="17">
            <el-input v-model="registerForm.reg_v_code"></el-input>
          </el-col>
          <el-col :span="4" class="reg_v_code">
            <img :src="baseUrl+'/captcha?type=login'" class="v_code" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="17">
            <el-input v-model="registerForm.rcode"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button>获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      dialogVisible: false,
      baseUrl: process.env.VUE_APP_BASRURL,
      registerForm: {
        username: "",
        phone: "",
        email: "",
        password: "",
        rcode: "",
        avatar: "",
        reg_v_code: ""
      },
      regRules: {
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 5, max: 10, message: "长度在5到10个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的电话", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 8, max: 16, message: "长度在8到16个字符", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入验证码", trigger: "blur" }
        ],
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        reg_v_code: [
          { required: true, message: "请输入图形码", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res);
      // console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw); //预览图片
      // var reader = new FileReader();
      // this.imageUrl = reader.readAsDataURL(file[0]);

      //如果文件上传成功的话，就会返回一个带有文件信息的对象，把里面的文件path传出
      this.registerForm.avatar = res.data.file_path;
      console.log(this.registerForm.avatar)
      //验证是否有文件path，有则说明上传成功，否则失败
      this.$refs.registerForm.validateField(["avatar"], err => {
        console.log(err);
      });
      console.log(this.imageUrl);
      // this.imageUrl =res.data.file_path
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          alert("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.reg_v_code .v_code {
  height: 41px;
  width: 120px;
  margin-left: 16px;
}
// .el-button {
//   width: 120px;
//   margin-left: 16px;
// }

// .el-button span {
//   text-align: center;
// }

.el-dialog--center .el-dialog__body {
  padding: 30px 30px 35px;
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-form-item {
  margin-bottom: 25px;
}
</style>