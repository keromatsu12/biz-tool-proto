<script setup lang="ts">
const mockups = [
  { name: 'Login Form', path: '/mockups/login', description: 'Authentication form with email and password inputs.' },
  { name: 'User Profile', path: '/mockups/profile', description: 'Settings form with various input types.' },
  { name: 'Dashboard', path: '/mockups/dashboard', description: 'Stats overview with widgets and charts.' },
  { name: 'Searchable List', path: '/mockups/list', description: 'Data table with search, filter, and pagination.' },
  { name: 'Feedback & Notifications', path: '/mockups/feedback', description: 'Demonstration of modals and toasts.' },
];
</script>

<template>
  <div class="p-mockups-index">
    <div class="l-container">
      <h1 class="p-mockups-index__title">UI Mockups</h1>
      <p class="p-mockups-index__subtitle">A collection of UI patterns built with base components.</p>

      <div class="p-mockups-index__grid">
        <NuxtLink
          v-for="mockup in mockups"
          :key="mockup.path"
          :to="mockup.path"
          class="p-mockups-index__card"
        >
          <h2 class="p-mockups-index__card-title">{{ mockup.name }}</h2>
          <p class="p-mockups-index__card-desc">{{ mockup.description }}</p>
          <span class="p-mockups-index__link-text">View Mockup &rarr;</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.p-mockups-index {
  padding: 40px 0;
  background-color: #f8f9fa;
  min-height: 100vh;

  &__title {
    font-size: 2.5rem;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    font-size: 1.1rem;
    color: #718096;
    margin-bottom: 3rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  &__card {
    display: block;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #e2e8f0;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      border-color: #cbd5e0;
    }
  }

  &__card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  &__card-desc {
    color: #718096;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  &__link-text {
    font-weight: 600;
    color: #3182ce;
  }
}
</style>
