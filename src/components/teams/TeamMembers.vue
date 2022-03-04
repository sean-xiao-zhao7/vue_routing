<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  props: ['id'],
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  created() {
    this.load(this.id);
  },
  watch: {
    id(newId) {
      this.load(newId);
    },
  },
  methods: {
    load(id) {
      const team = this.teams.find((t) => t.id === id);
      const members = team.members;
      const filteredMembers = [];
      for (const mid of members) {
        const user = this.users.find((u) => u.id === mid);
        filteredMembers.push(user);
      }
      this.members = filteredMembers;
      this.teamName = team.teamName;
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 5px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
