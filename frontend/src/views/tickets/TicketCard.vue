<template>
  <div
    class="card"
    :class="priorityClass"
    @click="$emit('click')"
  >

    <div class="flex justify-between items-start gap-2">
      <h4 class="font-semibold text-slate-800 text-sm">
        {{ ticket.title }}
      </h4>

      <span class="text-xs text-slate-400">
        #{{ ticket.ticket_id }}
      </span>
    </div>

    <p class="text-xs text-slate-500 mt-2 line-clamp-2">
      {{ ticket.description }}
    </p>

    <div class="flex justify-between items-center mt-3">

      <span
        class="text-xs px-2 py-1 rounded-full font-medium"
        :class="priorityBadge"
      >
        {{ priorityLabel }}
      </span>

      <span class="text-xs text-slate-400">
        {{ statusLabel }}
      </span>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  ticket: any;
}>();

const priorityMap: Record<number, string> = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Critical",
};

const statusMap: Record<number, string> = {
  1: "Open",
  2: "In Progress",
  3: "Resolved",
  4: "Closed",
};

const priorityLabel = computed(() =>
  priorityMap[props.ticket.priority_id] || "Unknown"
);

const statusLabel = computed(() =>
  statusMap[props.ticket.status_id] || "Unknown"
);

const priorityClass = computed(() => {
  switch (props.ticket.priority_id) {
    case 4:
      return "border-l-4 border-red-500";
    case 3:
      return "border-l-4 border-orange-400";
    case 2:
      return "border-l-4 border-yellow-400";
    default:
      return "border-l-4 border-green-400";
  }
});

const priorityBadge = computed(() => {
  switch (props.ticket.priority_id) {
    case 4:
      return "bg-red-100 text-red-700";
    case 3:
      return "bg-orange-100 text-orange-700";
    case 2:
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-green-100 text-green-700";
  }
});
</script>

<style scoped>
.card {
  background: white;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: all 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
}
</style>