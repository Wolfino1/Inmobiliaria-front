export interface SidebarOption {
  label: string;
  route: string;
  icon: string;
}

export const SIDEBAR_OPTIONS: Record<string, SidebarOption[]> = {
    
  SELLER: [
    { label: 'Publicar casa', route: '/create-house', icon: 'Home' },
    { label: 'Mis casas',      route: '/my-houses',    icon: 'Home'},
  ],

  BUYER: [
    { label: 'Explorar casas',  route: '/catalog',     icon: 'Search'     },
    { label: 'Mis visitas',     route: '/my-visits',   icon: 'Calendar'   },
    { label: 'Perfil',          route: '/profile',     icon: 'User'       },
  ],

  ADMIN: [
    { label: 'Dashboard',     route: '/dashboard',  icon: 'Info'     },
    { label: 'Categorías',    route: '/categories', icon: 'Tag'      },
    { label: 'Ubicaciones',    route: '/locations/create', icon: 'Tag'},
    { label: 'Propiedades',   route: '/properties', icon: 'Home'     },
    { label: 'Usuarios',      route: '/users',      icon: 'Users'    },
    { label: 'Configuración', route: '/settings',   icon: 'Settings' },
  ],
};