<template>
    <van-cell center title="心动模式">
        <template #right-icon>
            <van-switch v-model="isMatchModel"/>
        </template>
    </van-cell>
    <user-card-list :user-list="userList"/>
    <van-empty v-if="userList.length < 1" image="search" description="搜索结果为空"/>
</template>
<script setup lang='ts'>
import {showFailToast} from 'vant';
import {ref, watchEffect} from 'vue';
import {UserType} from '../models/user';
import myAxios from '../plugins/myAxios';

const isMatchModel = ref<boolean>(false)
const userList = ref([])

/**
 * 根据匹配模式来获取数据
 *
 * @author yupi
 */
const loadData = async () => {
    let api = isMatchModel.value ? "/user/match" : "/user/recommend";
    const userListData: UserType[] = await myAxios.get(api, {
        params: isMatchModel.value ? {num: 10} : {
            pageNum: 1,
            pageSize: 10
        }
    }).then((response) => {
        //@ts-ignore
        if (response.code === 200) {
            return response?.data
        } else {
            showFailToast("获取失败")
        }
    })

    if (userListData) {
        userList.value = userListData.map(user => {
            user.tags = JSON.parse(user.tags as unknown as string)
            return user
        })
    }
}

watchEffect(() => {
    loadData();
})
</script>
<style lang='scss' scoped>
:deep(.van-cell__title) {
  text-align: left;
}
</style>