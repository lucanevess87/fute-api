import { FootyEvent, Player, Team } from "@prisma/client";

type PlayerFootyEvent = {
    team: Team;
    footyEvent: FootyEvent;
    player: Player;
    assists: number | null;
    goals: number | null;
};

export type FootyEventResponse = {
    playerFootyEvent: Omit<PlayerFootyEvent, "footyEvent">[];
} & FootyEvent;


export type TeamResponse = {
    playerFootyEvent: Omit<PlayerFootyEvent, "team">[];
} & Team;