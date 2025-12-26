<script setup lang="ts">
const breadcrumbItems = [
  { label: 'Mockups', to: '/mockups' },
  { label: 'Dashboard' }
];

const period = ref('last30days');
const periodOptions = [
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'Last 30 Days', value: 'last30days' },
  { label: 'This Year', value: 'thisyear' },
];

const metrics = [
  { label: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up' },
  { label: 'Active Users', value: '2,345', change: '+15.2%', trend: 'up' },
  { label: 'New Signups', value: '145', change: '-5.4%', trend: 'down' },
  { label: 'Bounce Rate', value: '42.3%', change: '+2.1%', trend: 'down' },
];

const activities = [
  { id: 1, user: 'Alice Smith', action: 'placed a new order', time: '2 mins ago' },
  { id: 2, user: 'Bob Johnson', action: 'updated profile settings', time: '1 hour ago' },
  { id: 3, user: 'Charlie Brown', action: 'subscribed to the newsletter', time: '3 hours ago' },
  { id: 4, user: 'David Wilson', action: 'submitted a ticket', time: '5 hours ago' },
];

// Mock chart data
const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Visitors',
      data: [120, 190, 30, 50, 20, 30, 100],
      borderColor: '#3182ce',
      backgroundColor: 'rgba(49, 130, 206, 0.1)',
      tension: 0.4,
      fill: true,
    }
  ]
};
</script>

<template>
  <div class="p-dashboard">
    <div class="l-container">
      <div class="p-dashboard__nav">
        <BaseBreadcrumb :items="breadcrumbItems" />
      </div>

      <div class="p-dashboard__header">
        <h1 class="p-dashboard__title">Dashboard</h1>
        <div class="p-dashboard__controls">
          <BaseSelect
            v-model="period"
            :options="periodOptions"
            label=""
            class="p-dashboard__select"
          />
          <BaseButton variant="primary">Download Report</BaseButton>
        </div>
      </div>

      <!-- Metrics Grid -->
      <div class="p-dashboard__metrics">
        <BaseCard v-for="metric in metrics" :key="metric.label" class="p-dashboard__metric-card">
          <div class="p-dashboard__metric-content">
             <span class="p-dashboard__metric-label">{{ metric.label }}</span>
             <span class="p-dashboard__metric-value">{{ metric.value }}</span>
             <span
               class="p-dashboard__metric-change"
               :class="{ 'is-positive': metric.trend === 'up', 'is-negative': metric.trend === 'down' }"
             >
               {{ metric.change }} from last month
             </span>
          </div>
        </BaseCard>
      </div>

      <div class="p-dashboard__grid">
        <!-- Main Chart Area -->
        <div class="p-dashboard__chart-section">
          <BaseCard title="Traffic Overview">
            <div class="p-dashboard__chart-placeholder">
              <DashboardChart
                v-if="chartData && chartData.datasets && chartData.datasets.length > 0"
                :data="chartData"
                type="line"
                :height="300"
              />
              <div v-else class="p-dashboard__mock-chart">
                 No Data Available
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Activity Feed -->
        <div class="p-dashboard__activity-section">
           <BaseCard title="Recent Activity">
             <ul class="p-dashboard__activity-list">
               <li v-for="activity in activities" :key="activity.id" class="p-dashboard__activity-item">
                 <div class="p-dashboard__activity-avatar">
                   {{ activity.user.charAt(0) }}
                 </div>
                 <div class="p-dashboard__activity-details">
                   <p class="p-dashboard__activity-text">
                     <strong>{{ activity.user }}</strong> {{ activity.action }}
                   </p>
                   <span class="p-dashboard__activity-time">{{ activity.time }}</span>
                 </div>
               </li>
             </ul>
             <div class="p-dashboard__activity-footer">
               <BaseButton variant="secondary" size="small" block>View All Activity</BaseButton>
             </div>
           </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.p-dashboard {
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
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: #1a202c;
  }

  &__controls {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  &__select {
    min-width: 150px;
  }

  &__metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  &__metric-content {
    display: flex;
    flex-direction: column;
  }

  &__metric-label {
    font-size: 0.875rem;
    color: #718096;
    margin-bottom: 0.5rem;
  }

  &__metric-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.25rem;
  }

  &__metric-change {
    font-size: 0.875rem;

    &.is-positive {
      color: #38a169;
    }
    &.is-negative {
      color: #e53e3e;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  &__mock-chart {
    height: 300px;
    background: #edf2f7;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #718096;
    border-radius: 4px;
  }

  &__activity-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__activity-item {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #edf2f7;

    &:last-child {
      border-bottom: none;
    }
  }

  &__activity-avatar {
    width: 40px;
    height: 40px;
    background: #3182ce;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
  }

  &__activity-text {
    font-size: 0.9rem;
    color: #2d3748;
    margin-bottom: 0.25rem;
  }

  &__activity-time {
    font-size: 0.75rem;
    color: #a0aec0;
  }

  &__activity-footer {
    margin-top: 1rem;
  }
}
</style>
