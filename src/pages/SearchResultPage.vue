<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="userList.length < 1" image="search" description="搜索结果为空" />
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { UserType } from '../models/user'
import myAxios from '../plugins/myAxios'
import qs from 'qs'

const route = useRoute()
const { tags } = route.query;
const userList = ref([])

onMounted(async () => {
  const userListData:UserType[] = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  }).then((response) => {
    return response?.data
  }).catch((error) => {
    console.log('/user/search/tags error', error)
  })

  if(userListData) {
    userList.value = userListData.map(user => {
      if(user.tags)
        user.tags = JSON.parse(user.tags as unknown as string)
      return user
    })
  }
})
</script>
<style lang='scss' scoped>
:deep .van-card__content {
  text-align: left;
}
</style>