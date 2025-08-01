import { computed, onMounted, ref } from 'vue';

export const useAuth = () => {
  const user = ref(null);
  const token = ref(null);
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const isLoading = ref(false);
  const error = ref(null);

  const TOKEN_KEY = 'auth_token';
  const USER_KEY = 'auth_user';

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  };

  const isTokenValid = (tokenPayload) => {
    if (!tokenPayload) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return tokenPayload.exp > currentTime;
  };

  const saveAuthData = (authToken, userData) => {
    try {
      localStorage.setItem(TOKEN_KEY, authToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));

      token.value = authToken;
      user.value = userData;
      error.value = null;
    } catch (e) {
      console.error('Error saving auth data:', e);
      error.value = 'Помилка збереження даних авторизації';
    }
  };

  const loadSavedAuth = () => {
    try {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      const savedUser = localStorage.getItem(USER_KEY);

      if (savedToken && savedUser) {
        const tokenPayload = parseJwt(savedToken);

        if (isTokenValid(tokenPayload)) {
          token.value = savedToken;
          user.value = JSON.parse(savedUser);
          return true;
        } else {
          clearAuth();
          return false;
        }
      }
      return false;
    } catch (e) {
      console.error('Error loading saved auth:', e);
      clearAuth();
      return false;
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      isLoading.value = true;
      error.value = null;

      const credential = response.credential;
      const payload = parseJwt(credential);

      if (!payload) {
        throw new Error('Не вдалося розпарсити токен');
      }

      const userData = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        givenName: payload.given_name,
        familyName: payload.family_name,
        emailVerified: payload.email_verified
      };

      saveAuthData(credential, userData);

      return userData;
    } catch (e) {
      error.value = e.message || 'Помилка авторизації';
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const sendToBackend = async (googleToken) => {
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: googleToken })
      });

      if (!response.ok) {
        throw new Error('Backend verification failed');
      }

      const data = await response.json();
      return data.token;
    } catch (e) {
      console.error('Backend auth error:', e);
      throw e;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      token.value = null;
      user.value = null;
      error.value = null;
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const clearAuth = () => {
    logout();
  };

  const getAuthHeaders = () => {
    if (!token.value) return {};

    return {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    };
  };

  const apiRequest = async (url, options = {}) => {
    try {
      const headers = {
        ...getAuthHeaders(),
        ...options.headers
      };

      const response = await fetch(url, {
        ...options,
        headers
      });

      if (response.status === 401) {
        logout();
        throw new Error('Токен недійсний. Увійдіть знову.');
      }

      return response;
    } catch (e) {
      console.error('API request error:', e);
      throw e;
    }
  };

  const refreshUserData = async () => {
    try {
      if (!isAuthenticated.value) return null;

      console.log(user.value);
      return user.value;
    } catch (e) {
      console.error('Error refreshing user data:', e);
      error.value = 'Помилка оновлення даних користувача';
      return null;
    }
  };

  const hasRole = (role) => {
    return user.value?.roles?.includes(role) || false;
  };

  const hasPermission = (permission) => {
    return user.value?.permissions?.includes(permission) || false;
  };

  onMounted(() => {
    loadSavedAuth();
  });

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    isLoading: readonly(isLoading),
    error: readonly(error),

    handleGoogleLogin,
    logout,
    clearAuth,
    getAuthHeaders,
    apiRequest,
    refreshUserData,
    hasRole,
    hasPermission,
    loadSavedAuth
  };
};
