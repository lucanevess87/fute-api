import { z } from 'zod';

const usernameValidationMessage =
  'O nome de usuário não pode conter espaços em branco.';
const playersPerTeamValidationMessage =
  'O número de jogadores por time deve ser um número inteiro maior ou igual a 0.';
const numOfTeamsValidationMessage =
  'O número de times deve ser um número inteiro maior ou igual a 0.';

const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  starts: z.number().int(),
  type: z.enum(['monthly', 'daily']),
});

export const FootySchema = z.object({
  id: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  email: z.string().email({ message: 'O email deve ser um email válido.' }),
  username: z
    .string()
    .regex(/^\S*$/, { message: usernameValidationMessage })
    .trim(),
  name: z.string({ description: 'O nome é obrigatório.' }),
  password: z.string({ description: 'A senha é obrigatória.' }),
  location: z.string({ description: 'A localização é obrigatória.' }),
  start_hour: z.date().nullable().optional(),
  end_hour: z.date().nullable().optional(),
  players_per_team: z
    .number()
    .int()
    .min(0, { message: playersPerTeamValidationMessage })
    .optional(),
  num_of_teams: z
    .number()
    .int()
    .min(0, { message: numOfTeamsValidationMessage })
    .optional(),
  players: z.array(PlayerSchema).optional(),
});

export const UpdateFootySchema = z.object({
  name: z.string({ description: 'O nome é obrigatório.' }),
  location: z.string({ description: 'A localização é obrigatória.' }),
  start_hour: z.date().nullable().optional(),
  end_hour: z.date().nullable().optional(),
  players_per_team: z
    .number()
    .int()
    .min(0, { message: playersPerTeamValidationMessage })
    .optional(),
  num_of_teams: z
    .number()
    .int()
    .min(0, { message: numOfTeamsValidationMessage })
    .optional(),
  players: z.array(PlayerSchema).optional(),
});
