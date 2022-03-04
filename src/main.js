import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import UsersList from './components/users/UsersList.vue';
import nf404 from './components/nav/404.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      path: '/teams',
      component: TeamsList,
    },
    {
      path: '/teams/:id',
      component: TeamMembers,
      props: true,
    },
    {
      path: '/users',
      component: UsersList,
    },
    {
      path: '/:notFound(.*)',
      component: nf404,
    },
  ],
});

const app = createApp(App);
app.use(router);
app.mount('#app');
