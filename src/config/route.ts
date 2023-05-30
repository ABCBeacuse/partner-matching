import Index from "../pages/Index.vue"
import Team from '../pages/team/TeamPage.vue'
import Search from '../pages/SearchPage.vue'
import UserPage from '../pages/user/UserPage.vue'
import UserMesPage from "../pages/user/UserMesPage.vue";
import UserCreatePage from "../pages/user/UserCreatePage.vue";
import Edit from '../pages/user/UserEditPage.vue'
import SearchList from '../pages/SearchResultPage.vue'
import UserLogin from '../pages/UserLoginPage.vue'
import TeamAddPage from "../pages/team/TeamAddPage.vue";
import TeamUpdatePage from "../pages/team/TeamUpdatePage.vue";



const routes = [
  { path: '/', component: Index },
  { path: '/team', title:"找队伍", component: Team },
  { path: '/search', title:"找伙伴", component: Search },
  { path: '/user', title:"用户主页", component: UserPage },
  { path: '/user/mes', title:"个人信息", component: UserMesPage },
  { path: '/user/create', title:"我创建的队伍", component: UserCreatePage },
  { path: '/user/edit', title:"更新信息", component: Edit },
  { path: '/user/list', title:"用户列表", component: SearchList},
  { path: '/user/login', title:"登录", component: UserLogin },
  { path: '/team/add', title:"创建队伍", component: TeamAddPage},
  { path: '/team/update', title:"更新队伍信息", component: TeamUpdatePage}
]

export default routes