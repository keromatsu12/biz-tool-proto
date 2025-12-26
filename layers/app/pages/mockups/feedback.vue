<script setup lang="ts">
const breadcrumbItems = [
  { label: 'Mockups', to: '/mockups' },
  { label: 'Feedback & Notifications' }
];

// Toast State
const toast = ref({
  show: false,
  message: '',
  type: 'info' as 'info' | 'success' | 'warning' | 'error',
});

const showToast = (type: 'info' | 'success' | 'warning' | 'error', message: string) => {
  toast.value = { show: true, type, message };
};

// Modal State
const showDeleteModal = ref(false);
const showInfoModal = ref(false);
const showFormModal = ref(false);

const formData = ref({
  title: '',
  description: ''
});

const submitFormModal = () => {
  showToast('success', `Form submitted: ${formData.value.title}`);
  showFormModal.value = false;
  formData.value = { title: '', description: '' };
};
</script>

<template>
  <div class="p-feedback">
    <div class="l-container">
      <div class="p-feedback__nav">
        <BaseBreadcrumb :items="breadcrumbItems" />
      </div>

      <div class="p-feedback__header">
        <h1 class="p-feedback__title">Feedback & Notifications</h1>
        <p class="p-feedback__subtitle">Examples of interactive user feedback components.</p>
      </div>

      <div class="p-feedback__grid">
        <!-- Toast Examples -->
        <BaseCard title="Toasts & Alerts">
          <p class="p-feedback__desc">Click buttons to trigger toast notifications.</p>
          <div class="p-feedback__button-group">
            <BaseButton @click="showToast('info', 'This is a general information message.')" variant="secondary">Info Toast</BaseButton>
            <BaseButton @click="showToast('success', 'Action completed successfully!')" variant="success">Success Toast</BaseButton>
            <BaseButton @click="showToast('warning', 'Please be careful with this action.')" variant="warning">Warning Toast</BaseButton>
            <BaseButton @click="showToast('error', 'An error occurred. Please try again.')" variant="danger">Error Toast</BaseButton>
          </div>
        </BaseCard>

        <!-- Modal Examples -->
        <BaseCard title="Modals">
          <p class="p-feedback__desc">Various modal dialog use cases.</p>
          <div class="p-feedback__button-group">
            <BaseButton @click="showInfoModal = true" variant="primary">Information Modal</BaseButton>
            <BaseButton @click="showDeleteModal = true" variant="danger">Confirmation Modal</BaseButton>
            <BaseButton @click="showFormModal = true" variant="secondary">Form Modal</BaseButton>
          </div>
        </BaseCard>
      </div>

      <!-- Modals Implementation -->
      <BaseModal v-model="showInfoModal" title="Did you know?">
        <p>This is a standard modal dialog used to present information to the user without leaving the current page context.</p>
        <template #footer>
          <BaseButton @click="showInfoModal = false">Got it</BaseButton>
        </template>
      </BaseModal>

      <BaseModal v-model="showDeleteModal" title="Confirm Deletion">
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <template #footer>
          <div class="p-feedback__modal-actions">
            <BaseButton variant="secondary" @click="showDeleteModal = false">Cancel</BaseButton>
            <BaseButton variant="danger" @click="showDeleteModal = false; showToast('error', 'Item deleted')">Delete</BaseButton>
          </div>
        </template>
      </BaseModal>

      <BaseModal v-model="showFormModal" title="Submit Feedback">
        <div class="p-feedback__modal-form">
          <BaseInputText v-model="formData.title" label="Subject" placeholder="Brief summary" />
          <BaseTextarea v-model="formData.description" label="Details" placeholder="Provide more details..." />
        </div>
        <template #footer>
          <div class="p-feedback__modal-actions">
            <BaseButton variant="secondary" @click="showFormModal = false">Cancel</BaseButton>
            <BaseButton variant="primary" @click="submitFormModal">Submit</BaseButton>
          </div>
        </template>
      </BaseModal>

      <!-- Global Toast Component -->
      <BaseToast
        v-model="toast.show"
        :message="toast.message"
        :type="toast.type"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.p-feedback {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem 0;

  &__nav {
    margin-bottom: 2rem;
  }

  &__header {
    margin-bottom: 3rem;
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

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  &__desc {
    color: #4a5568;
    margin-bottom: 1.5rem;
  }

  &__button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  &__modal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
