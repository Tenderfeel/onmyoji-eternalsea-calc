<template>
  <div class="container mx-auto pb-4">
    <div class="row">
      <div class="col-6">
        <ul class="nav nav-pills my-2">
          <li class="nav-item">
            <router-link to="/" class="nav-link">1回戦</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/second" class="nav-link">2回戦</router-link>
          </li>
          <li></li>
        </ul>
      </div>

      <div class="col-6 d-flex justify-content-end align-items-center">
        <ul class="nav nav-pills my-2">
          <li class="nav-item">
            <router-link to="/about" class="nav-link">
              <i class="bi bi-info-circle me-1"></i>
              <span>About</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>