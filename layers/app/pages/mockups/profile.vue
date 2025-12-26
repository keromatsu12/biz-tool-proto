<script setup lang="ts">
const profile = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  bio: 'Frontend developer passionate about Vue.js and Nuxt.',
  role: 'developer',
  notifications: true,
  newsletter: false,
  language: 'en',
});

const roles = [
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Product Manager', value: 'manager' },
];

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Spanish', value: 'es' },
];

const saveProfile = () => {
  alert('Profile updated successfully!');
};

const breadcrumbItems = [
  { label: 'Mockups', to: '/mockups' },
  { label: 'Profile' }
];
</script>

<template>
  <div class="p-profile">
    <div class="l-container">
      <div class="p-profile__nav">
        <BaseBreadcrumb :items="breadcrumbItems" />
      </div>

      <div class="p-profile__header">
        <h1 class="p-profile__title">Profile Settings</h1>
        <p class="p-profile__subtitle">Manage your account settings and preferences.</p>
      </div>

      <div class="p-profile__content">
        <BaseCard class="p-profile__card">
          <form @submit.prevent="saveProfile" class="p-profile__form">
            <!-- Personal Information -->
            <section class="p-profile__section">
              <h2 class="p-profile__section-title">Personal Information</h2>
              <div class="p-profile__grid">
                <BaseInputText
                  v-model="profile.firstName"
                  label="First Name"
                  placeholder="John"
                />
                <BaseInputText
                  v-model="profile.lastName"
                  label="Last Name"
                  placeholder="Doe"
                />
              </div>
              <div class="p-profile__field">
                <BaseInputText
                  v-model="profile.email"
                  label="Email Address"
                  type="email"
                />
              </div>
              <div class="p-profile__field">
                <BaseTextarea
                  v-model="profile.bio"
                  label="Bio"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </section>

            <hr class="p-profile__divider" />

            <!-- Preferences -->
            <section class="p-profile__section">
              <h2 class="p-profile__section-title">Preferences</h2>
              <div class="p-profile__field">
                <BaseSelect
                  v-model="profile.language"
                  :options="languages"
                  label="Language"
                />
              </div>

              <div class="p-profile__field">
                <label class="p-profile__label">Role</label>
                <div class="p-profile__radio-group">
                  <BaseInputRadio
                    v-for="role in roles"
                    :key="role.value"
                    v-model="profile.role"
                    :value="role.value"
                    :label="role.label"
                    name="role-group"
                  />
                </div>
              </div>

              <div class="p-profile__field">
                <label class="p-profile__label">Notifications</label>
                <div class="p-profile__checkbox-group">
                  <BaseSwitch
                    v-model="profile.notifications"
                    label="Enable email notifications"
                  />
                  <BaseInputCheckbox
                    v-model="profile.newsletter"
                    label="Subscribe to newsletter"
                  />
                </div>
              </div>
            </section>

            <div class="p-profile__actions">
              <BaseButton variant="secondary" type="button" @click="$router.back()">Cancel</BaseButton>
              <BaseButton variant="primary" type="submit">Save Changes</BaseButton>
            </div>
          </form>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.p-profile {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem 0;

  &__nav {
    margin-bottom: 2rem;
  }

  &__header {
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    color: #718096;
  }

  &__card {
    padding: 2rem;
  }

  &__form {
    max-width: 800px;
  }

  &__section {
    margin-bottom: 2rem;
  }

  &__section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1.5rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    margin-bottom: 1.5rem;
  }

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4a5568;
    font-size: 0.875rem;
  }

  &__divider {
    border: 0;
    border-top: 1px solid #e2e8f0;
    margin: 2rem 0;
  }

  &__radio-group,
  &__checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
}
</style>
