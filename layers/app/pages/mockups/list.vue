<script setup lang="ts">
const breadcrumbItems = [
  { label: 'Mockups', to: '/mockups' },
  { label: 'Searchable List' }
];

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const selectedStatus = ref('');

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
];

const tableColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Customer' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'lastActive', label: 'Last Active' },
  { key: 'actions', label: 'Actions' },
];

// Mock Data Generation
const allUsers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : 'User',
  status: i % 4 === 0 ? 'inactive' : (i % 5 === 0 ? 'pending' : 'active'),
  lastActive: `${Math.floor(Math.random() * 24)} hours ago`,
}));

const filteredUsers = computed(() => {
  return allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = !selectedStatus.value || user.status === selectedStatus.value;
    return matchesSearch && matchesStatus;
  });
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredUsers.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage));

const handleEdit = (user: any) => {
  alert(`Edit user: ${user.name}`);
};

const handleDelete = (user: any) => {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    alert('User deleted');
  }
};
</script>

<template>
  <div class="p-list">
    <div class="l-container">
      <div class="p-list__nav">
        <BaseBreadcrumb :items="breadcrumbItems" />
      </div>

      <div class="p-list__header">
        <h1 class="p-list__title">User Management</h1>
        <BaseButton variant="primary">Add New User</BaseButton>
      </div>

      <BaseCard class="p-list__card">
        <!-- Filters -->
        <div class="p-list__filters">
          <div class="p-list__search">
            <BaseInputSearch
              v-model="searchQuery"
              placeholder="Search users..."
            />
          </div>
          <div class="p-list__filter-controls">
            <BaseSelect
              v-model="selectedStatus"
              :options="statusOptions"
              label=""
              class="p-list__status-select"
            />
          </div>
        </div>

        <!-- Table -->
        <div class="p-list__table-wrapper">
          <DataTable :columns="tableColumns" :items="paginatedUsers">
            <template #cell-name="{ value }">
              <strong>{{ value }}</strong>
            </template>

            <template #cell-status="{ value }">
              <StatusLabel
                :label="value"
                :variant="value === 'active' ? 'success' : value === 'inactive' ? 'danger' : 'warning'"
              />
            </template>

            <template #cell-actions="{ item }">
              <div class="p-list__actions">
                <BaseButton size="small" variant="secondary" @click="handleEdit(item)">Edit</BaseButton>
                <BaseButton size="small" variant="danger" @click="handleDelete(item)">Delete</BaseButton>
              </div>
            </template>
          </DataTable>
        </div>

        <!-- Pagination -->
        <div class="p-list__pagination">
           <span class="p-list__pagination-info">
             Showing {{ paginatedUsers.length }} of {{ filteredUsers.length }} results
           </span>
           <BasePagination
             :current-page="currentPage"
             :total-pages="totalPages"
             @update:current-page="currentPage = $event"
           />
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.p-list {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem 0;

  &__nav {
    margin-bottom: 2rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: #1a202c;
  }

  &__card {
    padding: 1.5rem;
  }

  &__filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__search {
    flex: 1;
    max-width: 400px;
  }

  &__filter-controls {
    display: flex;
    gap: 1rem;
  }

  &__status-select {
    min-width: 180px;
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }

  &__pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    border-top: 1px solid #edf2f7;
    padding-top: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__pagination-info {
    font-size: 0.875rem;
    color: #718096;
  }
}
</style>
