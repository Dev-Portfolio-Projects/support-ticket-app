import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import TicketsView from "@/views/tickets/TicketsView.vue";

import MainLayout from "@/layouts/MainLayout.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },

    {
      path: "/",
      component: MainLayout,

      children: [
        {
          path: "dashboard",
          component: DashboardView,
        },
        
        {
          path: "tickets",
          component: TicketsView,
        }
      ],
    },

    {
      path: "/login",
      component: LoginView,
    },

    {
      path: "/register",
      component: RegisterView,
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  const publicPages = ["/login", "/register"];
  const isPublic = publicPages.includes(to.path);

  if (!auth.token && !isPublic) {
    return "/login";
  }

  if (auth.token && isPublic) {
    return "/dashboard";
  }

  if (to.path.startsWith("/dashboard")) {
    if (!auth.token) return "/login";

    if (auth.user && auth.user.role_id !== 1) {
      return "/tickets";
    }
  }
});

export default router;