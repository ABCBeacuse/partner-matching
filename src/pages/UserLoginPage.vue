<template>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="userAccount"
            name="userAccount"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="userPassword"
            type="password"
            name="userPassword"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
            提交
        </van-button>
      </div>
    </van-form>
</template>
<script setup lang='ts'>
import { showFailToast, showSuccessToast } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import myAxios from '../plugins/myAxios';
import {setCurrentUserState} from "../states/user";

const userAccount = ref("")
const userPassword = ref("")
const router = useRouter()

const onSubmit = async (value) => {
    const result =  await myAxios.post('/user/login',value)
    if(result.code === 200 && result.data){
        showSuccessToast("登录成功")
        // 存储当前登录用户状态
        setCurrentUserState(result?.data)
        router.replace("/")
    }else{
        showFailToast("登录失败")
    }
}
</script>
<style lang='scss' scoped>

</style>