export const routes = {
  getHomeRoute: () => "/",
  getEpisodesRoute: () => "/episodes",
  getEpisodeRoute: (id?: string | null) => `/episodes/episode/${id}`,
  getCharactersRoute: () => "/characters",
  getCharacterRoute: (id?: string | null) => `/characters/character/${id}`,
} as const;

export default routes;
