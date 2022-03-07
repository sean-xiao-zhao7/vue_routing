import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import UsersList from './components/users/UsersList.vue';
import UserFooter from './components/users/UserFooter.vue';
import nf404 from './components/nav/404.vue';

const router = createRouter({
  scrollBehavior(savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0,
    };
  },
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter },
      name: 'teams',
      children: [
        {
          path: ':id',
          name: 'team-members',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      components: { default: UsersList, footer: UserFooter },
      beforeEnter(to, from, next) {},
    },
    {
      path: '/:notFound(.*)',
      component: nf404,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'team-members') {
    next();
  } else {
    next({ name: 'team-members', params: { id: 't2' } });
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');
