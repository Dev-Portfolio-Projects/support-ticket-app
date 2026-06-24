<template>
  <div class="panel">

    <div class="flex items-start justify-between mb-4">
      <div>
        <p class="text-xs text-slate-400">Ticket #{{ localTicket.ticket_id }}</p>
        <h2 class="text-xl font-bold text-slate-800 leading-tight">
          {{ localTicket.title }}
        </h2>
      </div>

      <button
        class="text-slate-400 hover:text-red-500 transition"
        @click="$emit('close')"
      >
        ✕
      </button>
    </div>

    <div class="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4">
      <p class="text-sm text-slate-600 leading-relaxed">
        {{ localTicket.description }}
      </p>
    </div>

    <div class="mb-4">
      <label class="text-xs text-slate-500">Estado</label>

      <select
        v-model="localTicket.status_id"
        class="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option :value="1">Open</option>
        <option :value="2">In Progress</option>
        <option :value="3">Resolved</option>
        <option :value="4">Closed</option>
      </select>
    </div>

    <div class="mb-6">
      <label class="text-xs text-slate-500">Prioridad</label>

      <div class="mt-1">
        <span
          class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
          :class="priorityClass"
        >
          {{ priorityLabel }}
        </span>
      </div>
    </div>

    <div class="flex gap-2">

      <button
        class="flex-1 bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50"
        :disabled="loading"
        @click="update"
      >
        {{ loading ? "Guardando..." : "Guardar cambios" }}
      </button>

      <button
        class="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
        @click="$emit('close')"
      >
        Cancelar
      </button>

    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, ref } from "vue";
import { api } from "@/services/api";

const props = defineProps<{ ticket: any }>();
const emit = defineEmits(["close", "updated"]);

const loading = ref(false);

const localTicket = reactive({
  ticket_id: 0,
  title: "",
  description: "",
  status_id: 1,
  priority_id: 1,
});

watch(
  () => props.ticket,
  (t) => {
    if (!t) return;

    localTicket.ticket_id = t.ticket_id;
    localTicket.title = t.title;
    localTicket.description = t.description;
    localTicket.status_id = t.status_id;
    localTicket.priority_id = t.priority_id;
  },
  { immediate: true }
);

const priorityLabel = computed(() => {
  const map: Record<number, string> = {
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Critical",
  };

  return map[localTicket.priority_id] ?? "Unknown";
});

const priorityClass = computed(() => {
  switch (localTicket.priority_id) {
    case 1:
      return "bg-green-100 text-green-700";
    case 2:
      return "bg-yellow-100 text-yellow-700";
    case 3:
      return "bg-orange-100 text-orange-700";
    case 4:
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
});

const update = async () => {
  if (loading.value) return;

  loading.value = true;

  try {
    const res = await api.put(
      `/tickets/${localTicket.ticket_id}`,
      {
        status_id: Number(localTicket.status_id),
      }
    );

    emit("updated", res.data.ticket);
    emit("close");
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 360px;
  height: 100vh;
  background: white;
  border-left: 1px solid #e5e7eb;
  padding: 22px;
  box-shadow: -10px 0 25px rgba(0,0,0,0.06);
  overflow-y: auto;
}
</style>