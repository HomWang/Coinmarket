import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    storage: window.localStorage,
  })(store)
}
