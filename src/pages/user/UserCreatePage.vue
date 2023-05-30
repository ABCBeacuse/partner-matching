<template>
    <div id="team_page">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="listTeam"/>
        <team-card-list
                :team-list="teamList"
        />
        <van-empty v-if="teamList?.length < 1" image="search" description="没有找到合适的队伍"/>
    </div>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios";
import {showFailToast} from "vant";

const router = useRouter();
const teamList = ref([]);
const searchText = ref("");
/**
 * 根据传递的搜索条件，来获取我创建的队伍列表
 */
const listTeam = async (val = "") => {
    const res = await myAxios.get("/team/list/my/create", {
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
}
</style>