<template>
  <div>

    <!-- HEADER -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">
        Dashboard
      </h1>

      <p class="text-slate-500">
        Resumen general del sistema
      </p>
    </div>

    <!-- LOADING -->
    <div
      v-if="loading"
      class="bg-white rounded-2xl p-8 shadow"
    >
      Cargando estadísticas...
    </div>

    <!-- DATA -->
    <div v-if="data">

      <!-- TOP CARDS -->
      <div class="grid md:grid-cols-3 gap-6">

        <!-- TOTAL -->
        <div class="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <p class="text-slate-500 text-sm">
            Total Tickets
          </p>

          <h2 class="text-4xl font-bold text-blue-600 mt-2">
            {{ data.total }}
          </h2>
        </div>

        <!-- ESTADOS -->
        <div class="bg-white p-6 rounded-2xl shadow">
          <h3 class="font-semibold mb-3">
            Por Estado
          </h3>

          <div class="space-y-2">
            <div
              v-for="item in data.byStatus"
              :key="item.status_name"
              class="flex justify-between bg-slate-50 p-3 rounded-xl"
            >
              <span class="text-slate-600">
                {{ item.status_name }}
              </span>

              <span class="font-bold text-slate-800">
                {{ item.total }}
              </span>
            </div>
          </div>
        </div>

        <!-- PRIORIDAD -->
        <div class="bg-white p-6 rounded-2xl shadow">
          <h3 class="font-semibold mb-3">
            Por Prioridad
          </h3>

          <div class="space-y-2">
            <div
              v-for="item in data.byPriority"
              :key="item.priority_name"
              class="flex justify-between bg-slate-50 p-3 rounded-xl"
            >
              <div>
                <p class="text-slate-700 font-medium">
                  {{ item.priority_name }}
                </p>

                <p class="text-xs text-slate-500">
                  SLA: {{ item.sla_hours }}h
                </p>
              </div>

              <span class="font-bold text-slate-800">
                {{ item.total }}
              </span>
            </div>
          </div>
        </div>

      </div>

      <!-- OPEN / CLOSED -->
      <div class="mt-6 bg-white p-6 rounded-2xl shadow">

        <h3 class="font-semibold mb-4">
          Abiertos vs Cerrados
        </h3>

        <div class="grid grid-cols-2 gap-4">

          <!-- OPEN -->
          <div class="bg-green-50 p-4 rounded-xl">
            <p class="text-sm text-slate-600">
              Abiertos
            </p>

            <p class="text-2xl font-bold text-green-600">
              {{ data.openClosed.open }}
            </p>
          </div>

          <!-- CLOSED -->
          <div class="bg-red-50 p-4 rounded-xl">
            <p class="text-sm text-slate-600">
              Cerrados
            </p>

            <p class="text-2xl font-bold text-red-600">
              {{ data.openClosed.closed }}
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "@/services/api";

const data = ref<any>(null);
const loading = ref(false);

const loadDashboard = async () => {
  try {
    loading.value = true;

    const res = await api.get("/dashboard");

    data.value = res.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadDashboard);
</script>