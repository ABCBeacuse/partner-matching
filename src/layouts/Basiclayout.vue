<template>
    <van-nav-bar
            :title="title"
            right-text="按钮"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
    >
        <template #right>
            <van-icon name="search" size="18"/>
        </template>
    </van-nav-bar>
    <div id="content">
        <router-view/>
    </div>
    <van-tabbar route>
        <van-tabbar-item to="/" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item to="/team" icon="friends-o">队伍</van-tabbar-item>
        <van-tabbar-item to="/user" icon="manager-o">个人</van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang='ts'>
import {useRouter} from 'vue-router';
import {ref} from "vue";
import routes from "../config/route";

const router = useRouter()

// 默认标题
const DEFAULT_TITLE = "伙伴匹配"
const title = ref(DEFAULT_TITLE);

/**
 * 添加路由守卫 根据路由切换标题
 *
 * https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
 */
router.beforeEach((to, from) => {
    const path = to.path;
    const route = routes.find(route => {
        return route.path === path;
    });
    title.value = route?.title ?? DEFAULT_TITLE;
})
const onClickLeft: () => void = () => router.back()
const onClickRight: () => void = () => router.push('/search')

</script>

<style lang='scss' scoped>
#content {
  padding-bottom: 50px;
}
</style>