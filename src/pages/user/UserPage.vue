<template>
    <van-cell-group>
        <van-cell title="昵称" :value="user?.username"/>
        <van-cell title="个人信息" to="/user/mes"/>
        <van-cell title="我创建的队伍" to="/user/create"/>
    </van-cell-group>
</template>
<script setup lang='ts'>
import {onMounted, ref} from "vue";
import {getCurrentUserState} from "../../states/user";

const user = ref();
onMounted( () => {
    user.value = getCurrentUserState();
})
</script>
<style lang='scss' scoped>
:deep(.van-cell__title) {
  text-align: left;
  padding-left: 10px;
}
</style>