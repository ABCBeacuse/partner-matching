<template>
    <div id="team_update">
        <!--    @submit=="onSubmit" 表示 submit 按钮点击后会触发 onSubmit 方法    -->
        <van-form @submit="onSubmit">
            <van-cell-group>
                <van-field
                        v-model="initFormData.name"
                        name="name"
                        label="队伍名称"
                        placeholder="请输入队伍名称"
                        :rules="[{required: true, message: '请填写队伍名称'}]"
                />
                <van-field
                        v-model="initFormData.description"
                        type="textarea"
                        name="description"
                        autosize
                        label="队伍描述"
                        placeholder="请输入队伍描述"
                />
                <van-field
                        name="status"
                        label="队伍状态"
                >
                    <template #input>
                        <van-radio-group v-model="initFormData.status" direction="horizontal">
                            <van-radio name="0">公开</van-radio>
                            <van-radio name="1">私有</van-radio>
                            <van-radio name="2">加密</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                        v-if="Number(initFormData.status) === 2"
                        v-model="initFormData.password"
                        name="password"
                        label="队伍密码"
                        placeholder="请输入队伍密码"
                />
                <van-field
                        v-model="initFormData.expireTime"
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
                    更新队伍信息
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script setup lang="ts">

import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {TeamType} from "../../models/team";

const router = useRouter();
const route = useRoute();

/**
 * 根据队伍 ID 获取队伍信息, 填写表单默认值
 */
const initFormData = ref<TeamType>({} as TeamType);
onMounted(async () => {
    const res = await myAxios.get("/team/get", {
        params: {id: route.query.id}
    });
    if (res?.code === 200 && res.data) {
        initFormData.value = {
            ...res.data,
            status: String(res.data.status)
        };
    } else {
        showFailToast(res.description ?? res.message);
    }
})

/**
 * 过期时间选择
 */
const showTimePicker = ref(false);
const minDate = new Date();
const dateConfirm = ({selectedValues}) => {
    showTimePicker.value = false;
    initFormData.value.expireTime = selectedValues.join("-");
}

/**
 * 提交更新信息
 */
const onSubmit = async () => {
    // todo 前端数据校验
    // 之前状态选择变成了字符串，这里把 status 覆盖一下。
    const postData = {
        ...initFormData.value,
        status: Number(initFormData.value.status)
    }
    // todo 接口请求封装到一个单独的文件中，即目录 api/
    const res = await myAxios.post("/team/update", postData);
    if (res?.code === 200 && res.data) {
        showSuccessToast("更新队伍信息成功");
        router.push({
            path: '/team',
            // 替换掉浏览器中存储的历史栈中的数据，即使用浏览器的回退功能不能返回到创建队伍页面。不希望当前页面可以进行回退
            // 即使用 /team 替换掉浏览器中栈的 /team/add 页面
            replace: true
        });
    } else {
        showFailToast(res.description ?? res.message);
    }
}
</script>
<style lang="scss" scoped>
#team_add {
  padding: 10px;
}
</style>