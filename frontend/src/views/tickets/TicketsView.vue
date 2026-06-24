<template>
  <div class="p-6">

    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-slate-800">Tickets</h1>
        <p class="text-slate-500">Gestión tipo Kanban</p>
      </div>

      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        @click="openModal = true"
      >
        + Nuevo Ticket
      </button>
    </div>

    <div v-if="loading" class="bg-white p-6 rounded-xl shadow">
      Cargando tickets...
    </div>

    <div v-if="!loading && tickets.length" class="flex gap-4 overflow-x-auto">

      <div
        v-for="col in columns"
        :key="col.id"
        class="min-w-[250px] bg-slate-100 rounded-xl p-3"
      >
        <h3 class="font-bold text-slate-700 mb-3">
          {{ col.name }}
        </h3>

        <div class="space-y-3">
          <TicketCard
            v-for="t in filtered(col.id)"
            :key="t.ticket_id"
            :ticket="t"
            @click="selectTicket(t)"
          />
        </div>

      </div>
    </div>

    <div v-if="!loading && !tickets.length" class="bg-white p-6 rounded-xl shadow">
      No hay tickets aún
    </div>

    <TicketModal
      v-if="openModal"
      @close="openModal = false"
      @created="loadTickets"
    />

    <TicketDetail
      v-if="selected"
      :ticket="selected"
      @close="selected = null"
      @updated="onTicketUpdated"
    />

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "@/services/api";

import TicketCard from "./TicketCard.vue";
import TicketModal from "./TicketModal.vue";
import TicketDetail from "./TicketDetail.vue";

const tickets = ref<any[]>([]);
const loading = ref(false);

const selected = ref<any>(null);
const openModal = ref(false);

const columns = [
  { id: 1, name: "Open" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Resolved" },
  { id: 4, name: "Closed" },
];

const loadTickets = async () => {
  try {
    loading.value = true;
    const res = await api.get("/tickets");
    tickets.value = res.data.tickets;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const onTicketUpdated = (updated: any) => {
  const index = tickets.value.findIndex(
    t => t.ticket_id === updated.ticket_id
  );

  if (index === -1) {
    loadTickets();
    return;
  }

  tickets.value[index] = {
    ...tickets.value[index],
    ...updated,
  };
};

const filtered = (status_id: number) => {
  return tickets.value.filter(
    t => Number(t.status_id) === Number(status_id)
  );
};

const selectTicket = (ticket: any) => {
  selected.value = ticket;
};

onMounted(loadTickets);
</script>