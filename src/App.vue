<template>
  <div class="container mx-auto pb-4">
    <ul class="nav nav-pills my-2">
      <li class="nav-item">
        <router-link to="/" class="nav-link">1F</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/second" class="nav-link">2F</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>