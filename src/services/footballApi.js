import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const footballApiHeaders = {
  // "X-RapidAPI-Key": "b9a82d3ce8mshecad553a2fe2f38p14be23jsn2077049af767", //yahoo
  "X-RapidAPI-Key": "e2685d08d9msh237ed081fdee5e3p1cab4djsndf01bbc9a1d0", //google
  "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com'",
};
const baseUrl = "https://api-football-beta.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: footballApiHeaders });
export const footballApi = createApi({
  reducerPath: "footballApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getFixturesByDate: builder.query({
      query: (date) => createRequest(`/fixtures?date=${date}`),
    }),
    getFixtureById: builder.query({
      query: (id) => createRequest(`/fixtures?id=${id}`),
    }),
    getLeagueById: builder.query({
      query: (id) => createRequest(`/leagues?id=${id}`),
    }),
    getHeadToHeadFixtures: builder.query({
      query: ({ homeId, awayId }) =>
        createRequest(`/fixtures/headtohead?last=15&h2h=${homeId}-${awayId}`),
    }),
    getTeamById: builder.query({
      query: (id) => createRequest(`/teams?id=${id}`),
    }),
    getOddsByFixtureId: builder.query({
      query: (id) => createRequest(`/odds?fixture=${id}`),
    }),
    getPreviousFixturesByTeamId: builder.query({
      query: ({ teamId, last }) =>
        createRequest(`/fixtures?team=${teamId}&last=${last}`),
    }),
    getNextFixturesByTeamId: builder.query({
      query: ({ teamId, next }) =>
        createRequest(`/fixtures?team=${teamId}&next=${next}`),
    }),
    getPreviousFixtures: builder.query({
      query: (date) => createRequest(`/fixtures?date=${date}&status=ft`),
    }),
    getUpcomingFixtures: builder.query({
      query: (date) => createRequest(`/fixtures?date=${date}&status=ns`),
    }),
    getLiveFixtures: builder.query({
      query: () => createRequest(`/fixtures?live=all`),
    }),
    getStandingsByLeagueId: builder.query({
      query: (id) => createRequest(`/standings?season=2022&league=${id}`),
    }),
    getStandingsBySeasonAndLeagueId: builder.query({
      query: ({ season, leagueId }) =>
        createRequest(`/standings?season=${season}&league=${leagueId}`),
    }),
    getLeagueByCountryName: builder.query({
      query: (name) => createRequest(`/leagues?country=${name}`),
    }),
    getFixturesByLeagueId: builder.query({
      query: (id) => createRequest(`/fixtures?last=30&league=${id}`),
    }),
    getResultsByRoundAndLeagueId: builder.query({
      query: ({ leagueId, round }) =>
        createRequest(
          `/fixtures?season=2022&league=${leagueId}&round=Regular Season - ${round}`
        ),
    }),
    getUpcomingFixturesByLeagueId: builder.query({
      query: (id) => createRequest(`/fixtures?next=10&league=${id}`),
    }),
    getCurrentRoundByLeagueId: builder.query({
      query: (id) =>
        createRequest(`/fixtures/rounds?season=2022&current=true&league=${id}`),
    }),
    getAllRoundsByLeagueId: builder.query({
      query: (id) => createRequest(`/fixtures/rounds?season=2022&league=${id}`),
    }),
    getTopScorersByLeagueId: builder.query({
      query: (id) =>
        createRequest(`/players/topscorers?season=2022&league=${id}`),
    }),
    getTransfersByTeamId: builder.query({
      query: (id) => createRequest(`/transfers?team=${id}`),
    }),
    getPlayerById: builder.query({
      query: (id) => createRequest(`/players?id=${id}&season=2022`),
    }),
    getCountry: builder.query({
      query: (name) => createRequest(`/countries?name=${name}`),
    }),
    getLeagueByTeamId: builder.query({
      query: (id) => createRequest(`/leagues?team=${id}`),
    }),
    getSquadByTeamId: builder.query({
      query: (id) => createRequest(`/squads?team=${id}`),
    }),
    getTransfersByPlayerId: builder.query({
      query: (id) => createRequest(`/transfers?player=${id}`),
    }),
    getTeamBySearchTerm: builder.query({
      query: (term) => createRequest(`/teams?search=${term}`),
    }),
    getLeagueBySearchTerm: builder.query({
      query: (term) => createRequest(`/leagues?search=${term}`),
    }),
    getCoachBySearchTerm: builder.query({
      query: (term) => createRequest(`/coachs?search=${term}`),
    }),
    getCoachById: builder.query({
      query: (id) => createRequest(`/coachs?id=${id}`),
    }),
    getTrophiesByCoachId: builder.query({
      query: (id) => createRequest(`/trophies?coach=${id}`),
    }),
    getTrophiesByPlayerId: builder.query({
      query: (id) => createRequest(`/trophies?player=${id}`),
    }),
    getAllCountries: builder.query({
      query: () => createRequest(`/countries`),
    }),
  }),
});
export const {
  useGetFixturesByDateQuery,
  useGetFixtureByIdQuery,
  useGetLeagueByIdQuery,
  useGetHeadToHeadFixturesQuery,
  useGetTeamByIdQuery,
  useGetOddsByFixtureIdQuery,
  useGetPreviousFixturesByTeamIdQuery,
  useGetNextFixturesByTeamIdQuery,
  useGetPreviousFixturesQuery,
  useGetUpcomingFixturesQuery,
  useGetLiveFixturesQuery,
  useGetStandingsByLeagueIdQuery,
  useGetLeagueByCountryNameQuery,
  useGetFixturesByLeagueIdQuery,
  useGetResultsByRoundAndLeagueIdQuery,
  useGetUpcomingFixturesByLeagueIdQuery,
  useGetCurrentRoundByLeagueIdQuery,
  useGetAllRoundsByLeagueIdQuery,
  useGetTopScorersByLeagueIdQuery,
  useGetTransfersByTeamIdQuery,
  useGetStandingsBySeasonAndLeagueIdQuery,
  useGetPlayerByIdQuery,
  useGetCountryQuery,
  useGetLeagueByTeamIdQuery,
  useGetSquadByTeamIdQuery,
  useGetTransfersByPlayerIdQuery,
  useGetTeamBySearchTermQuery,
  useGetCoachBySearchTermQuery,
  useGetLeagueBySearchTermQuery,
  useGetCoachByIdQuery,
  useGetTrophiesByCoachIdQuery,
  useGetTrophiesByPlayerIdQuery,
  useGetAllCountriesQuery,
} = footballApi;
