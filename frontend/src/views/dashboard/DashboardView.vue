<template>
  <div>

    <div class="mb-6">
      <h1 class="text-3xl font-bold text-slate-800">
        Dashboard
      </h1>

      <p class="text-slate-500">
        Resumen general del sistema
      </p>
    </div>

    <div v-if="loading" class="bg-white rounded-2xl p-8 shadow">
      Cargando estadísticas...
    </div>

    <div v-if="data">

      <div class="grid md:grid-cols-3 gap-4 mb-4">

        <div class="bg-white p-4 rounded-xl shadow">
          <p class="text-slate-500 text-sm">Total</p>
          <h2 class="text-3xl font-bold text-blue-600">
            {{ data.total }}
          </h2>
        </div>

        <div class="bg-white p-4 rounded-xl shadow h-[220px]">
          <h3 class="text-sm font-semibold mb-2">Abiertos vs Cerrados</h3>
          <div class="h-[160px]">
            <canvas ref="openClosedChart"></canvas>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow h-[220px]">
          <h3 class="text-sm font-semibold mb-2">Por Estado</h3>
          <div class="h-[160px]">
            <canvas ref="statusChart"></canvas>
          </div>
        </div>

      </div>

      <div class="grid md:grid-cols-2 gap-4">

        <div class="bg-white p-4 rounded-xl shadow h-[260px]">
          <h3 class="text-sm font-semibold mb-2">Por Prioridad</h3>
          <div class="h-[200px]">
            <canvas ref="priorityChart"></canvas>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow">
          <h3 class="text-sm font-semibold mb-3">Detalle rápido</h3>

          <div class="space-y-2 text-sm">

            <div
              v-for="item in data.byStatus"
              :key="item.status_name"
              class="flex justify-between bg-slate-50 p-2 rounded-lg"
            >
              <span>{{ item.status_name }}</span>
              <b>{{ item.total }}</b>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "@/services/api";

import {
  Chart,
  DoughnutController,
  PieController,
  BarController,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

Chart.register(
  DoughnutController,
  PieController,
  BarController,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const data = ref<any>(null);
const loading = ref(false);

const openClosedChart = ref<HTMLCanvasElement | null>(null);
const statusChart = ref<HTMLCanvasElement | null>(null);
const priorityChart = ref<HTMLCanvasElement | null>(null);

let charts: Chart[] = [];

const destroyCharts = () => {
  charts.forEach(c => c.destroy());
  charts = [];
};

const loadDashboard = async () => {
  try {
    loading.value = true;

    const res = await api.get("/dashboard");
    data.value = res.data.data;

    setTimeout(renderCharts, 100);

  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const renderCharts = () => {
  destroyCharts();

  if (openClosedChart.value && data.value?.openClosed) {
    charts.push(
      new Chart(openClosedChart.value, {
        type: "doughnut",
        data: {
          labels: ["Abiertos", "Cerrados"],
          datasets: [{
            data: [
              data.value.openClosed.open || 0,
              data.value.openClosed.closed || 0
            ],
            backgroundColor: ["#22c55e", "#ef4444"]
          }]
        },
        options: {
          maintainAspectRatio: false
        }
      })
    );
  }

  if (statusChart.value && data.value?.byStatus?.length) {
    charts.push(
      new Chart(statusChart.value, {
        type: "pie",
        data: {
          labels: data.value.byStatus.map((s: any) => s.status_name),
          datasets: [{
            data: data.value.byStatus.map((s: any) => s.total),
            backgroundColor: ["#3b82f6", "#f59e0b", "#22c55e", "#ef4444"]
          }]
        },
        options: {
          maintainAspectRatio: false
        }
      })
    );
  }

  if (priorityChart.value && data.value?.byPriority?.length) {
    charts.push(
      new Chart(priorityChart.value, {
        type: "bar",
        data: {
          labels: data.value.byPriority.map((p: any) =>
            p.priority_name || "Sin prioridad"
          ),
          datasets: [{
            label: "Tickets",
            data: data.value.byPriority.map((p: any) => p.total || 0),
            backgroundColor: "#6366f1"
          }]
        },
        options: {
          maintainAspectRatio: false
        }
      })
    );
  }
};

onMounted(loadDashboard);
</script>