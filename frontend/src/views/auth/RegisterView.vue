<template>
  <AuthLayout>
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-slate-800">
        Crear cuenta
      </h1>
      <p class="text-slate-500 text-sm mt-1">
        Empieza a gestionar tus tickets
      </p>
    </div>

    <form class="space-y-4" @submit.prevent="register">
      <!-- FULL NAME -->
      <div>
        <label class="text-sm text-slate-600">Nombre completo</label>

        <div class="relative mt-1">
          <User class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            v-model="form.full_name"
            type="text"
            placeholder="Juan Pérez"
            class="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
      </div>

      <!-- EMAIL -->
      <div>
        <label class="text-sm text-slate-600">Correo</label>

        <div class="relative mt-1">
          <Mail class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            v-model="form.email"
            type="email"
            placeholder="ejemplo@email.com"
            class="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
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
            class="w-full border border-slate-200 rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
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
        class="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 active:scale-[0.98] transition"
      >
        Crear cuenta
      </button>
    </form>

    <p class="text-center text-sm text-slate-500 mt-6">
      ¿Ya tienes cuenta?
      <a href="/login" class="text-emerald-600 hover:underline">
        Inicia sesión
      </a>
    </p>
  </AuthLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { toast } from "vue-sonner";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useAuthStore } from "@/stores/auth";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-vue-next";

const auth = useAuthStore();

const form = reactive({
  full_name: "",
  email: "",
  password: "",
});

const showPassword = ref(false);

const register = async () => {
  try {
    await auth.register(form);
    toast.success("Usuario creado");
  } catch (error) {
    toast.error("No fue posible registrar");
  }
};
</script>