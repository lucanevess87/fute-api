import { FootyEvent, Player } from '@prisma/client';

type GroupedPlayer = {
  player: Player;
  assists: number;
  goals: number;
};

export type GroupedTeam = {
  id: string;
  name: string;
  victories: number;
  players: GroupedPlayer[];
};

export type GroupedEvent = Omit<FootyEvent, 'playerFootyEvent'> & {
  teams: GroupedTeam[];
};

export type Team = {
  name: string;
  footyEventId: string;
  victories: number;
  players: any[];
};

export type DrawTeamsParams = {
  players: any[];
  playersPerTeam: number;
};
