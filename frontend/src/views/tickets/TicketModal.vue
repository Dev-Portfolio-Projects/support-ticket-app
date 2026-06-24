<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div class="bg-white w-[440px] rounded-2xl p-6 shadow-lg">

      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
          <FilePlus class="w-5 h-5 text-blue-600" />
          Nuevo Ticket
        </h3>

        <button @click="$emit('close')" class="text-slate-400 hover:text-red-500">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form class="space-y-4" @submit.prevent="create">

        <div>
          <label class="text-sm text-slate-600">Título</label>

          <div class="relative mt-1">
            <Tag class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              v-model="form.title"
              type="text"
              class="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Error en login"
            />
          </div>
        </div>

        <div>
          <label class="text-sm text-slate-600">Descripción</label>

          <div class="relative mt-1">
            <AlignLeft class="w-4 h-4 text-slate-400 absolute left-3 top-3" />

            <textarea
              v-model="form.description"
              rows="4"
              class="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe el problema..."
            />
          </div>
        </div>

        <div>
          <label class="text-sm text-slate-600">Prioridad</label>

          <div class="relative mt-1">
            <AlertCircle class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <select
              v-model="form.priority_id"
              class="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option
                v-for="p in priorities"
                :key="p.priority_id"
                :value="p.priority_id"
              >
                {{ p.priority_name }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="text-sm text-slate-600">Categoría</label>

          <div class="relative mt-1">
            <Tag class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <select
              v-model="form.category_id"
              class="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option
                v-for="c in categories"
                :key="c.category_id"
                :value="c.category_id"
              >
                {{ c.name }}
              </option>
            </select>
          </div>
        </div>

        <button
          class="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? "Creando..." : "Crear ticket" }}
        </button>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { api } from "@/services/api";
import {
  FilePlus,
  X,
  Tag,
  AlignLeft,
  AlertCircle
} from "lucide-vue-next";

const emit = defineEmits(["close", "created"]);

const loading = ref(false);

type Priority = {
  priority_id: number;
  priority_name: string;
  sla_hours: number;
};

type Category = {
  category_id: number;
  name: string;
};

const priorities = ref<Priority[]>([]);
const categories = ref<Category[]>([]);

const form = reactive({
  title: "",
  description: "",
  priority_id: 1,
  category_id: 1,
  status_id: 1
});

const fetchCatalogs = async () => {
  try {
    const res = await api.get("/catalog");
    categories.value = res.data.categories;
    priorities.value = res.data.priorities;

    form.priority_id = priorities.value?.[0]?.priority_id ?? 1;
    form.category_id = categories.value?.[0]?.category_id ?? 1;
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchCatalogs);

const create = async () => {
  if (loading.value) return;

  loading.value = true;

  try {
    await api.post("/tickets", form);
    emit("created");
    emit("close");
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

</script>