<template>
  <div class="min-h-screen bg-slate-100 flex">

    <!-- SIDEBAR -->
    <aside
      class="w-64 bg-slate-900 text-white flex flex-col shadow-xl"
    >
      <!-- LOGO -->
      <div class="p-6 border-b border-slate-800">
        <h1 class="text-xl font-bold">
          Support App
        </h1>

        <p class="text-slate-400 text-sm">
          Sistema de Tickets
        </p>
      </div>

      <!-- MENU -->
      <nav class="flex-1 p-4 space-y-2">
        <RouterLink
          v-if="auth.user?.role_id === 1"
          to="/dashboard"
          class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition"
          active-class="bg-blue-600"
        >
          <LayoutDashboard class="w-5 h-5" />
          Dashboard
        </RouterLink>

        <RouterLink
          to="/tickets"
          class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition"
          active-class="bg-blue-600"
        >
          <Ticket class="w-5 h-5" />
          Tickets
        </RouterLink>
      </nav>

      <!-- FOOTER -->
      <div class="p-4 border-t border-slate-800">
        <button
          @click="logout"
          class="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition"
        >
          <LogOut class="w-4 h-4" />
          Salir
        </button>
      </div>
    </aside>

    <!-- CONTENT -->
    <main class="flex-1 p-8 overflow-y-auto">
      <RouterView />
    </main>

  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

import {
  LayoutDashboard,
  Ticket,
  LogOut,
} from "lucide-vue-next";

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push("/login");
};
</script>