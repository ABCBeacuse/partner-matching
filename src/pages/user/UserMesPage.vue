<template>
    <template v-if="user">
        <van-cell-group>
            <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username', '昵称', user.username)"/>
            <van-cell title="账号" :value="user.userAccount" />
            <van-cell title="头像" is-link>
                <img height="48" :src="user.avatarUrl" />
            </van-cell>
            <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender', '性别', user.gender)"/>
            <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
            <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('', '邮箱', user.email)"/>
            <van-cell title="星球编号" :value="user.planetCode" />
        </van-cell-group>
    </template>
</template>
<script setup lang='ts'>
import { showFailToast } from 'vant';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCurrentUser } from '../../services/user'

const router = useRouter()
const user = ref(null)

onMounted( async () => {
    const currentUser = await getCurrentUser()
    if(currentUser) {
        user.value = currentUser
    } else {
        showFailToast("获取用户信息失败")
    }
})
const toEdit = (editkey: string, editName: string, currentValue: string) => {
    router.push({
        path: '/user/edit',
        query: {
            editkey,
            editName,
            currentValue
        }
    })
}
</script>
<style lang='scss' scoped>
:deep(.van-cell__title) {
  text-align: left;
  padding-left: 10px;
}
</style>