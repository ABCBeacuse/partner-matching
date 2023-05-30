<template>
    <div id="team_add">
<!--    @submit=="onSubmit" 表示 submit 按钮点击后会触发 onSubmit 方法    -->
        <van-form @submit="onSubmit">
            <van-cell-group>
                <van-field
                        v-model="formData.name"
                        name="name"
                        label="队伍名称"
                        placeholder="请输入队伍名称"
                        :rules="[{required: true, message: '请填写队伍名称'}]"
                />
                <van-field
                        v-model="formData.description"
                        type="textarea"
                        name="description"
                        autosize
                        label="队伍描述"
                        placeholder="请输入队伍描述"
                />
                <van-field
                        name="maxNum"
                        label="最大人数"
                >
                    <template #input>
                        <van-stepper v-model="formData.maxNum" min="3" max="10"/>
                    </template>
                </van-field>
                <van-field
                        name="status"
                        label="队伍状态"
                >
                    <template #input>
                        <van-radio-group v-model="formData.status" direction="horizontal">
                            <van-radio name="0">公开</van-radio>
                            <van-radio name="1">私有</van-radio>
                            <van-radio name="2">加密</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                        v-if="Number(formData.status) === 2"
                        v-model="formData.password"
                        name="password"
                        label="队伍密码"
                        placeholder="请输入队伍密码"
                />
                <van-field
                        v-model="formData.expireTime"
                        name="expireTime"
                        label="过期时间"
                        is-link
                        readonly
                        placeholder="选择过期时间"
                        @click="showTimePicker = true"
                />
                <van-popup v-model:show="showTimePicker" position="bottom">
                    <van-date-picker
                            title="选择队伍过期时间"
                            :min-date="minDate"
                            @confirm="dateConfirm"
                            @cancel="showTimePicker = false"
                    />
                </van-popup>
            </van-cell-group>
            <div style="margin-top: 16px;">
<!--            native-type="submit"   表示这个按钮是 submit 按钮-->
                <van-button
                    type="primary"
                    round
                    block
                    native-type="submit"
                >
                    创建队伍
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script setup lang="ts">

import {ref} from "vue";
import myAxios from "../../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter();

// 表单默认值
const initFormData = {
    "description": "",
    "expireTime": "",
    "maxNum": 3,
    "name": "",
    "password": "",
    "status": "0",
}
// 过期时间选择控制
const showTimePicker = ref(false);
const minDate = new Date();

// 使用对象拓展符，保证 initFormData 中的值始终不会发生改变，方便我们去重置。
// 如果直接传递 initFormData，当 formData 发生改变了，initFormData 中的值也会变化。
const formData = ref({...initFormData});

// 过期时间选择
const dateConfirm = ({ selectedValues }) => {
    showTimePicker.value = false;
    formData.value.expireTime = selectedValues.join("-");
}
const onSubmit = async () => {
    // todo 前端数据校验

    // 之前状态选择变成了字符串，这里把 status 覆盖一下。
    const postData = {
        ...formData.value,
        status: Number(formData.value.status)
    }
    // todo 接口请求封装到一个单独的文件中，即目录 api/
    const res = await myAxios.post("/team/add", postData);
    if (res?.code === 200 && res.data) {
      showSuccessToast("创建队伍成功");
      router.push({
          path: '/team',
          // 替换掉浏览器中存储的历史栈中的数据，即使用浏览器的回退功能不能返回到创建队伍页面。不希望当前页面可以进行回退
          // 即使用 /team 替换掉浏览器中栈的 /team/add 页面
          replace: true
      });
    } else {
        showFailToast(res.description ?? res.message)
    }
}
</script>
<style lang="scss" scoped>
#team_add {
  padding: 10px;
}
</style>