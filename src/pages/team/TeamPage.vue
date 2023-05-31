<template>
    <div id="team_page">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="listTeam"/>
        <van-tabs v-model="activeTab" @change="tabChange">
            <van-tab title="公开" name="public" />
            <van-tab title="私密" name="private"/>
        </van-tabs>
        <team-card-list
                :team-list="teamList"
        />
        <van-empty v-if="teamList?.length < 1" image="search" description="没有找到合适的队伍"/>
        <van-button
                class="add-button"
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
import {showFailToast} from "vant";
import {teamStatusEnumNum} from "../../constants/team";
import qs from "qs";

const router = useRouter();
const addTeam = () => {
    router.push({
        path: "/team/add"
    })
}
const teamList = ref([]);
const searchText = ref("");
const activeTab = ref<string>("public");

/**
 * 标签切换
 * @param name
 */
const tabChange = (name) => {
    if (name === "public") {
        listTeam(searchText.value)
    } else {
        listTeam(searchText.value, [teamStatusEnumNum.SECRET])
    }
}

/**
 * 根据传递的搜索条件，来获取队伍列表
 */
const listTeam = async (val = "", statuses = [teamStatusEnumNum.PUBLIC]) => {
    const res = await myAxios.get("/team/list", {
        params: {
            searchText: val,
            statuses
        },
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    });
    if (res?.code == 200 && res.data) {
        teamList.value = res.data;
    } else {
        showFailToast(res.description ? res.description : res.message);
    }
}
onMounted(() => listTeam())
</script>
<style lang="scss" scoped>
#team_page {
  text-align: left;
}
</style>