<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
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
import 'vant/es/toast/style';
import { showFailToast, showSuccessToast } from 'vant';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import myAxios from '../../plugins/myAxios';
import { getCurrentUser } from '../../services/user';

const route = useRoute()
const router = useRouter()
const editUser = ref({
  editKey: route.query.editkey as string,
  editName: route.query.editName as string,
  currentValue: route.query.currentValue as string
})
let currentUser

// 进入编辑页面，肯定是已经登录过的
onBeforeMount(async () => {
  currentUser = await getCurrentUser()
})
const onSubmit = async (values) => {
  const response = await myAxios.post("/user/update",{
    id: currentUser.id,
    ...values
  })
  //@ts-ignore
  if(response.code === 200 && response.data > 0) {
    showSuccessToast("修改成功")
    router.back()
  } else {
    showFailToast("修改失败")
  }
}
</script>
<style lang='scss' scoped>

</style>