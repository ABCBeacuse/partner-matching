<template>
    <div id="team_list">
        <van-card
                v-for="team in props.teamList"
                :title="team.name"
                :desc="team.description"
                :thumb="TeamImg"
                :tag="teamStatusEnum[team.status]"
        >
            <template #bottom>
                <van-progress class="team_mes" :percentage="Math.ceil(team.joinNum / team.maxNum * 100)" />
                <div class="team_mes">
                    {{ "创建时间：" + team.createTime }}
                </div>
                <div class="team_mes" v-if="team.expireTime">
                    {{ "过期时间：" + team.expireTime }}
                </div>
            </template>
            <template #footer>
                <van-button
                        v-if="currentUser?.id === team.userId"
                        type="primary"
                        size="mini"
                        plain
                        @click="doUpdateTeam(team.id)"
                >
                    更新队伍
                </van-button>
                <van-button
                        v-if="!team.hasJoin"
                        type="primary"
                        size="mini"
                        plain
                        @click="preJoinTeam(team)"
                >
                    加入队伍
                </van-button>
                <!--                todo 仅加入队伍可见-->
                <van-button
                        v-if="team.hasJoin"
                        type="warning"
                        size="mini"
                        plain
                        @click="quitTeam(team.id)"
                >
                    退出队伍
                </van-button>
                <van-button
                        v-if="currentUser?.id === team.userId"
                        type="danger"
                        size="mini"
                        plain
                        @click="dissolveTeam(team.id)"
                >
                    解散队伍
                </van-button>
            </template>
        </van-card>
        <van-dialog :show="hasPassWord" title="密码" show-cancel-button @confirm="joinTeam" @cancel="doJoinCache">
            <van-field v-model="password"/>
        </van-dialog>
    </div>
</template>
<script setup lang="ts">
import {TeamType} from "../models/team";
import TeamImg from "../assets/team.png"
import {teamStatusEnum, teamStatusEnumNum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUserState} from "../states/user";
import {UserType} from "../models/user";
import {useRouter} from "vue-router";

interface TeamCardListProps {
    teamList: TeamType[]
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
    teamList: () => []
});

const currentUser = ref<UserType>();
onMounted(() => {
    currentUser.value = getCurrentUserState()
})

const router = useRouter();

// 控制输入密码 dialog
const hasPassWord = ref<boolean>(false)
// 当前加入的队伍 Id
const currentTeamId = ref<number>(0)
// 当前输入的队伍密码
const password = ref<string>("")

/**
 * 当前用户点击队伍卡片加入队伍
 * @param team
 */
const preJoinTeam = (team: TeamType) => {
    currentTeamId.value = team.id
    if (team.status === teamStatusEnumNum.SECRET) {
        // 显示输入密码弹框
        hasPassWord.value = true
    } else {
        joinTeam()
    }
}

// todo 密码动态添加
const joinTeam = async () => {
    // 防止一些异常的情况
    if (currentTeamId.value <= 0) {
        return
    }
    const res = await myAxios.post("/team/join", {
        teamId: currentTeamId.value,
        password: password.value
    });
    if (res?.code == 200 && res.data) {
        showSuccessToast("加入队伍成功")
        doJoinCache()
    } else {
        showFailToast("加入队伍失败" + (res.description ? `,${res.description}` : ""))
    }
    hasPassWord.value = false
}

/**
 * 清空队伍 ID 和 输入的密码
 */
const doJoinCache = () => {
    currentTeamId.value = 0
    password.value = ""
    hasPassWord.value = false
}

/**
 * 路由跳转到队伍更新页面，并传递队伍 ID
 * @param id
 */
const doUpdateTeam = (id: number) => {
    router.push({
        path: '/team/update',
        query: {id}
    })
}

/**
 * 通过 id 退出队伍
 * @param id
 */
const quitTeam = async (id: number) => {
    const res = await myAxios.post("/team/quit", {
        teamId: id
    });
    if (res?.code == 200 && res.data) {
        showSuccessToast("退出队伍成功");
    } else {
        showFailToast("退出队伍失败" + (res.description ? `,${res.description}` : ""));
    }
}

/**
 * 通过 id 解散队伍
 * @param id
 */
const dissolveTeam = async (id: number) => {
    const res = await myAxios.post("/team/delete", {
        id
    });
    if (res?.code == 200 && res.data) {
        showSuccessToast("删除队伍成功");
    } else {
        showFailToast("删除队伍失败" + (res.description ? `,${res.description}` : ""));
    }
}
</script>
<style lang="scss" scoped>
#team_list {
    .van-progress {
        margin:12px 0;
    }
}
</style>