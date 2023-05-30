<template>
    <div id="team_page">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="listTeam"/>
        <team-card-list
                :team-list="teamList"
        />
        <van-empty v-if="teamList?.length < 1" image="search" description="没有找到合适的队伍"/>
        <van-button
                type="primary"
                round
                @click="addTeam"
        >
            <van-icon name="plus"/>
        </van-button>
    </div>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios";
import {closeToast, showFailToast, showLoadingToast} from "vant";

const router = useRouter();
const addTeam = () => {
    router.push({
        path: "/team/add"
    })
}
const teamList = ref([]);
const searchText = ref("");
/**
 * 根据传递的搜索条件，来获取队伍列表
 */
const listTeam = async (val = "") => {
    const res = await myAxios.get("/team/list", {
        params: {
            searchText: val
        }
    });
    if (res?.code == 200 && res.data) {
        teamList.value = res.data;
    } else {
        showFailToast(res.description ?? res.message);
    }
}
onMounted(() => listTeam())
</script>
<style lang="scss" scoped>
#team_page {
  text-align: left;

  .van-button {
    position: fixed;
    right: 12px;
    bottom: 52px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
}
</style>