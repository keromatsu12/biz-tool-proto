<script setup lang="ts">
// --- State Management ---

// Toast
const toast = ref({
  show: false,
  message: 'This is a toast message',
  type: 'info' as 'info' | 'success' | 'warning' | 'error',
});

const showToast = (type: 'info' | 'success' | 'warning' | 'error', message: string) => {
  toast.value.type = type;
  toast.value.message = message;
  toast.value.show = true;
};

// Modal
const showModal = ref(false);

// Inputs
const textInput = ref('');
const passwordInput = ref('');
const numberInput = ref<number | null>(null);
const searchInput = ref('');
const dateInput = ref('');
const selectValue = ref('');
const radioValue = ref('opt1');
const checkboxValue = ref(false);
const checkboxGroupValue = ref(['opt1']);
const textareaValue = ref('');
const switchValue = ref(false);

// Tabs
const activeTab = ref('tab1');
const tabItems = [
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
  { label: 'Disabled Tab', value: 'tab3', disabled: true },
];

// Data Table
const currentPage = ref(1);
const tableData = [
  { id: 1, name: 'John Doe', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', role: 'User', status: 'pending' },
  { id: 3, name: 'Bob Johnson', role: 'Guest', status: 'inactive' },
];
const tableColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

// Select Options
const selectOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3 (Disabled)', value: 'opt3', disabled: true },
];

// Breadcrumbs
const breadcrumbItems = [
  { label: 'Home', to: '/' },
  { label: 'Catalog', to: '/catalog' },
  { label: 'Current Page' }
];

</script>

<template>
  <div class="p-catalog">
    <div class="l-container">
      <h1 class="p-catalog__title">Component Catalog</h1>

      <!-- Navigation Section -->
      <section class="p-catalog__section">
        <h2 class="p-catalog__section-title">Navigation</h2>
        <div class="p-catalog__row">
          <div class="p-catalog__item">
            <h3>Breadcrumb</h3>
            <BaseBreadcrumb :items="breadcrumbItems" />
          </div>
          <div class="p-catalog__item">
            <h3>Tabs</h3>
            <BaseTabs v-model="activeTab" :items="tabItems">
              <div class="p-catalog__tab-content">
                Content for {{ activeTab }}
              </div>
            </BaseTabs>
          </div>
        </div>
      </section>

      <!-- Buttons Section -->
      <section class="p-catalog__section">
        <h2 class="p-catalog__section-title">Buttons</h2>
        <div class="p-catalog__grid">
          <div class="p-catalog__card">
            <h3>Variants</h3>
            <div class="p-catalog__button-group">
              <BaseButton variant="primary">Primary</BaseButton>
              <BaseButton variant="secondary">Secondary</BaseButton>
              <BaseButton variant="danger">Danger</BaseButton>
            </div>
          </div>
          <div class="p-catalog__card">
            <h3>Sizes</h3>
            <div class="p-catalog__button-group">
              <BaseButton size="small">Small</BaseButton>
              <BaseButton size="medium">Medium</BaseButton>
              <BaseButton size="large">Large</BaseButton>
            </div>
          </div>
          <div class="p-catalog__card">
            <h3>States</h3>
            <div class="p-catalog__button-group">
              <BaseButton disabled>Disabled</BaseButton>
              <BaseButton block>Block Button</BaseButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Inputs Section -->
      <section class="p-catalog__section">
        <h2 class="p-catalog__section-title">Inputs</h2>
        <div class="p-catalog__grid">
          <div class="p-catalog__card">
            <h3>Text Input</h3>
            <BaseInputText v-model="textInput" label="Label" placeholder="Enter text..." />
            <p class="p-catalog__value">Value: {{ textInput }}</p>
            <BaseInputText model-value="Readonly" label="Readonly" readonly />
            <BaseInputText model-value="Disabled" label="Disabled" disabled />
            <BaseInputText model-value="" label="Error State" error="This field is required" />
          </div>
          <div class="p-catalog__card">
            <h3>Other Inputs</h3>
            <BaseInputNumber v-model="numberInput" label="Number" />
            <p class="p-catalog__value">Value: {{ numberInput }}</p>

            <BaseInputSearch v-model="searchInput" placeholder="Search..." />
            <p class="p-catalog__value">Value: {{ searchInput }}</p>

            <BaseSelect
              v-model="selectValue"
              :options="selectOptions"
              label="Select"
            />
            <p class="p-catalog__value">Value: {{ selectValue }}</p>

            <div style="margin-top: 1rem;">
                <BaseInputDate
                  model-value=""
                  label="Date Input"
                  placeholder="Select a date"
                />
            </div>

            <div style="margin-top: 1rem;">
                <BaseInputFile
                  label="File Input"
                />
            </div>
          </div>
          <div class="p-catalog__card">
             <h3>Selection Controls</h3>
             <div class="p-catalog__mt">
               <h4>Radio Buttons</h4>
               <div class="p-catalog__button-group">
                 <BaseInputRadio v-model="radioValue" value="opt1" label="Option 1" name="radio-group" />
                 <BaseInputRadio v-model="radioValue" value="opt2" label="Option 2" name="radio-group" />
                 <BaseInputRadio v-model="radioValue" value="opt3" label="Disabled" disabled name="radio-group" />
               </div>
               <p class="p-catalog__value">Selected: {{ radioValue }}</p>
             </div>

             <div class="p-catalog__mt">
               <h4>Checkboxes</h4>
               <BaseInputCheckbox v-model="checkboxValue" label="Single Checkbox" />
               <p class="p-catalog__value">Checked: {{ checkboxValue }}</p>

               <div class="p-catalog__mt">
                 <h5>Group</h5>
                 <div class="p-catalog__button-group">
                   <BaseInputCheckbox v-model="checkboxGroupValue" value="opt1" label="Option 1" />
                   <BaseInputCheckbox v-model="checkboxGroupValue" value="opt2" label="Option 2" />
                   <BaseInputCheckbox v-model="checkboxGroupValue" value="opt3" label="Disabled" disabled />
                 </div>
                 <p class="p-catalog__value">Selected: {{ checkboxGroupValue }}</p>
               </div>
             </div>

             <div class="p-catalog__mt">
                <h4>Switch</h4>
                <BaseSwitch v-model="switchValue" label="Toggle me" />
                <p class="p-catalog__value">State: {{ switchValue }}</p>
             </div>
          </div>
          <div class="p-catalog__card">
              <h3>Text Area</h3>
              <BaseTextarea v-model="textareaValue" label="Description" placeholder="Type something..." />
              <p class="p-catalog__value">Value: {{ textareaValue }}</p>
              <div class="p-catalog__mt">
                  <BaseTextarea model-value="Readonly content" label="Readonly" readonly />
              </div>
          </div>
        </div>
      </section>

      <!-- Feedback Section -->
      <section class="p-catalog__section">
        <h2 class="p-catalog__section-title">Feedback</h2>
        <div class="p-catalog__grid">
          <div class="p-catalog__card">
            <h3>Toasts</h3>
            <div class="p-catalog__button-group">
              <BaseButton @click="showToast('info', 'This is info')">Info</BaseButton>
              <BaseButton @click="showToast('success', 'Success!')" variant="secondary">Success</BaseButton>
              <BaseButton @click="showToast('warning', 'Warning!')" variant="secondary">Warning</BaseButton>
              <BaseButton @click="showToast('error', 'Error occurred')" variant="danger">Error</BaseButton>
            </div>
          </div>
          <div class="p-catalog__card">
            <h3>Modal</h3>
            <BaseButton @click="showModal = true">Open Modal</BaseButton>
          </div>
        </div>
      </section>

      <!-- Data Display Section -->
      <section class="p-catalog__section">
        <h2 class="p-catalog__section-title">Data Display</h2>
        <div class="p-catalog__grid">
          <div class="p-catalog__card">
            <h3>Status Labels</h3>
            <div class="p-catalog__row">
              <StatusLabel variant="primary" label="Primary" />
              <StatusLabel variant="secondary" label="Secondary" />
              <StatusLabel variant="success" label="Success" />
              <StatusLabel variant="danger" label="Danger" />
              <StatusLabel variant="warning" label="Warning" />
              <StatusLabel variant="info" label="Info" />
            </div>
          </div>
          <div class="p-catalog__card">
            <h3>Card</h3>
            <BaseCard title="Card Title">
              <p>This is a base card component.</p>
            </BaseCard>
          </div>
        </div>
        <div class="p-catalog__card p-catalog__mt">
          <h3>Data Table with Pagination</h3>
          <DataTable :columns="tableColumns" :items="tableData">
             <template #cell-status="{ value }">
                 <StatusLabel :label="value" :variant="value === 'active' ? 'success' : value === 'inactive' ? 'danger' : 'warning'" />
             </template>
          </DataTable>
          <BasePagination
            :current-page="currentPage"
            :total-pages="5"
            @update:current-page="currentPage = $event"
          />
          <p class="p-catalog__value">Current Page: {{ currentPage }}</p>
        </div>
      </section>

    </div>

    <!-- Interactive Components -->
    <BaseToast
      v-model="toast.show"
      :message="toast.message"
      :type="toast.type"
    />

    <BaseModal v-model="showModal" title="Example Modal">
      <p>This is the modal content.</p>
      <template #footer>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <BaseButton variant="secondary" @click="showModal = false">Cancel</BaseButton>
          <BaseButton @click="showModal = false">Confirm</BaseButton>
        </div>
      </template>
    </BaseModal>

  </div>
</template>

<style lang="scss" scoped>
.p-catalog {
  padding: 40px 0;
  background-color: #f8f9fa;
  min-height: 100vh;

  &__title {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #1a202c;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 1rem;
  }

  &__section {
    margin-bottom: 3rem;
  }

  &__section-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2d3748;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  &__row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
  }

  &__card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    h3 {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      color: #4a5568;
      font-weight: 600;
    }
  }

  &__button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__value {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #718096;
    font-family: monospace;
  }

  &__tab-content {
    padding: 1rem;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-top: none;
  }

  &__mt {
    margin-top: 1.5rem;
  }
}
</style>
