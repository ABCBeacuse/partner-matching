<template>
    <van-search
      v-model="searchText"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="selectTags.length === 0">
      暂无选中标签
    </div>
    <van-row gutter="20" style="padding: 0 16px;">
      <van-col v-for="tag in selectTags">
        <van-tag closeable size="medium" type="primary" @close="deleteTag(tag)">
          {{ tag }}
        </van-tag>
      </van-col>
    </van-row>
    <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select
      v-model:active-id="selectTags"
      v-model:main-active-index="activeMainIndex"
      :items="tagsList"
    />
    <div style="padding: 20px;">
      <van-button type="primary" size="small" @click="doSearchResult" block>搜索</van-button>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const searchText = ref("")
// 标签列表，id 作为匹配选中状态的标识符，只需要唯一即可
const originTagsList = [
  {
    text: '浙江',
    children: [
      { text: '杭州', id: '杭州' },
      { text: '温州', id: '温州' },
      { text: '宁波', id: '宁波' },
    ]
  }
]
const tagsList = ref(originTagsList)

/**
 * 搜索过滤
 * @param val 
 */
const onSearch = () => {
  tagsList.value = originTagsList.map( parentTag => {
    const tempParentTag = { ...parentTag }
    tempParentTag.children = tempParentTag.children.filter( tag => tag.text.includes(searchText.value))
    return tempParentTag
  })
}
/**
 * 组件取消默认清空搜索条件，需要手动恢复为 originTagsList
 */
const onCancel = () => tagsList.value = originTagsList

// 已选中的标签
const selectTags = ref([])
const activeMainIndex = ref(0)

// 移除标签
const deleteTag = (tag) => selectTags.value = selectTags.value.filter(item => item !== tag)

// 执行搜索
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: selectTags.value
    }
  })
}
</script>
<style lang='scss' scoped>

</style>