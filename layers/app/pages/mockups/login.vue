<script setup lang="ts">
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);
const router = useRouter();

const handleLogin = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    alert(`Logged in with: ${email.value}`);
    router.push('/mockups');
  }, 1000);
};

const breadcrumbItems = [
  { label: 'Mockups', to: '/mockups' },
  { label: 'Login' }
];
</script>

<template>
  <div class="p-login">
    <div class="l-container p-login__container">
      <div class="p-login__nav">
        <BaseBreadcrumb :items="breadcrumbItems" />
      </div>

      <div class="p-login__content">
        <BaseCard class="p-login__card">
          <div class="p-login__header">
            <h1 class="p-login__title">Welcome Back</h1>
            <p class="p-login__subtitle">Please enter your details to sign in.</p>
          </div>

          <form @submit.prevent="handleLogin" class="p-login__form">
            <div class="p-login__field">
              <BaseInputText
                v-model="email"
                label="Email Address"
                placeholder="name@company.com"
                type="email"
                required
              />
            </div>

            <div class="p-login__field">
              <BaseInputText
                v-model="password"
                label="Password"
                placeholder="••••••••"
                type="password"
                required
              />
            </div>

            <div class="p-login__actions">
              <BaseInputCheckbox v-model="rememberMe" label="Remember me" />
              <a href="#" class="p-login__forgot">Forgot password?</a>
            </div>

            <div class="p-login__submit">
              <BaseButton
                block
                variant="primary"
                type="submit"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Signing in...' : 'Sign in' }}
              </BaseButton>
            </div>

            <div class="p-login__footer">
              Don't have an account? <a href="#">Sign up</a>
            </div>
          </form>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.p-login {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem 0;

  &__nav {
    margin-bottom: 2rem;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  &__card {
    width: 100%;
    max-width: 480px;
    padding: 2rem;
  }

  &__header {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    color: #718096;
    font-size: 0.875rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }

  &__forgot {
    color: #3182ce;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__footer {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.875rem;
    color: #718096;

    a {
      color: #3182ce;
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
