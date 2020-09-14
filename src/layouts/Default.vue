<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Flight App</q-toolbar-title>
        <q-btn
          flat
          round
          dense
          size="lg"
          icon="search"
          :to="{ name: 'home' }"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="300"
      bordered
      content-class="bg-grey-3"
    >
      <q-list>
        <q-item :to="{ name: 'home' }" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="search" size="lg" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">Search</q-item-label>
            <q-item-label caption>Find a flight</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition enter-active-class="animated fadeIn" appear>
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "DrawerLayout",
  data() {
    return {
      drawer: false
    };
  }
};
</script>

<style lang="sass">
.large-icon i.q-icon
  font-size: 30px
</style>
