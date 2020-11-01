import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  tags: [] as string[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  tags: state => state.tags,
}

export const mutations: MutationTree<RootState> = {
  CHANGE_TAGS: (state, newTags: string[]) => (state.tags = newTags),
}

export const actions: ActionTree<RootState, RootState> = {
  fetchTags({ commit }, newTags: string[]) {
    commit('CHANGE_TAGS', newTags)
  },
}
