<template>
    <div class="login-container">
        <div class="login-content">
            <div class="login-content__top">
                <h2>Login Form</h2>
                <div class="other-select">
                    <a>忘记密码？</a>
                    <a>注册</a>
                </div>
            </div>
            <el-form ref="loginForm" :rules="loginRules" :model="loginForm" label-width="90px" label-suffix=":">
                <el-row>
                    <el-col>
                        <el-form-item label="username" prop="username">
                            <el-input v-model.trim="loginForm.username" type="text" tabindex="1" name="username"
                                :maxlength="12" placeholder="Username" auto-complete="on"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="password" prop="password">
                            <el-input v-model.trim="loginForm.password" type="password" tabindex="2" placeholder="Password"
                                auto-complete="on" show-password @keyup.enter.native="handleLogin"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- 拓展：验证码区域 -->
                    <el-col v-if="false">
                        <el-form-item label="validate code" prop="validatecode">
                            <el-input v-model="validatecode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-button :loading="loading" @click.native.prevent="handleLogin">登陆</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <div class="login-content__bottom">
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
    name: 'Login',
    data() {
        // validate function
        const validateUsername = (rules, value, callback) => {
            if (!value) {
                callback(new Error('please input username'))
            } else {
                if (validUsername(value)) {
                    callback()
                } else {
                    callback(new Error("please input register rules"))
                }
            }
        }
        const validatePassword = (rules, value, callback) => {
            if (value.length < 6) {
                callback(new Error('the password can not less than six digits'))
            } else {
                callback()
            }
        }

        return {
            // 默认登陆用户
            loginForm: {
                username: 'admin',
                password: '111111',
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            loading: false,
        }
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('user/Login', this.loginForm).then(() => {
                        // 登陆成功，获取用户信息跳转到首页
                        this.$router.push({ path: '/' }).catch(() => {})
                        this.loading = false
                    }).catch(error => {
                        this.loading = false
                        this.$message.error(error)
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;

.login-container {
    width: 100%;
    min-height: 100%;
    background-color: $bg;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-content {
        width: 500px;
        height: 400px;

        &__top {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: 60px;
            margin-bottom: 20px;
            color: #fff;
        }

        h2 {
            margin: 0;
        }

    }

    .el-input {
        width: 410px;
    }

    .el-button {
        width: 500px;
        background: #409eff !important;
        border: none;
        color: #fff;
    }

    span {
        font-size: 14px;
    }
}
</style>