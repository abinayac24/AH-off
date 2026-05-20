import { create } from 'zustand';
import api from '../services/api';

export const useConfigStore = create((set, get) => ({
  configs: {},
  loading: false,
  fetched: false,

  fetchConfigs: async () => {
    if (get().fetched || get().loading) return;
    set({ loading: true });
    try {
      const res = await api.get('/users/config/all');
      const obj = {};
      res.data.data.configs.forEach((cfg) => {
        obj[cfg.key] = cfg.value;
      });
      set({ configs: obj, fetched: true });
    } catch (err) {
      console.error('Failed to load configs', err);
    } finally {
      set({ loading: false });
    }
  },

  getPlatformName: () => {
    return get().configs['platform_name'] || 'AgnoHire';
  },

  isDarkModeDefault: () => {
    return get().configs['dark_mode_default'] || false;
  }
}));
