<template>
  <AuthLayout>
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-slate-800">
        Bienvenido de nuevo
      </h1>
      <p class="text-slate-500 text-sm mt-1">
        Inicia sesión para continuar
      </p>
    </div>

    <form class="space-y-4" @submit.prevent="login">
      <!-- EMAIL -->
      <div>
        <label class="text-sm text-slate-600">Correo</label>

        <div class="relative mt-1">
          <Mail class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            v-model="form.email"
            type="email"
            placeholder="ejemplo@email.com"
            class="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      <!-- PASSWORD -->
      <div>
        <label class="text-sm text-slate-600">Contraseña</label>

        <div class="relative mt-1">
          <Lock class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="w-full border border-slate-200 rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <Eye v-if="!showPassword" class="w-4 h-4" />
            <EyeOff v-else class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- BUTTON -->
      <button
        class="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 active:scale-[0.98] transition"
      >
        Iniciar sesión
      </button>
    </form>

    <p class="text-center text-sm text-slate-500 mt-6">
      ¿No tienes cuenta?
      <a href="/register" class="text-blue-600 hover:underline">
        Crear cuenta
      </a>
    </p>
  </AuthLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue-sonner";
import { Mail, Lock, Eye, EyeOff } from "lucide-vue-next";

const auth = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const showPassword = ref(false);

const login = async () => {
  try {
    await auth.login(form);
    toast.success("Bienvenido");
  } catch (error) {
    toast.error("Credenciales inválidas");
  }
};
</script>