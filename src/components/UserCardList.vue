<template>
  <van-card
    v-for="user in props.userList"
    :desc="user.userProfile"
    :title="user.username"
    :thumb="user.avatarUrl"
    :tag="user.userAccount"
  >
    <template #tags>
      <van-tag v-for="tag in user.tags" plain type="primary" style="margin-right: 6px; margin-top: 4px;">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>
<script setup lang='ts'>
import { UserType } from '../models/user';

interface UserCardListProps {
  userList: UserType[]
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  userList: () => []
})
</script>
<style lang='scss' scoped>
.van-card {
  text-align: left;
}
</style>