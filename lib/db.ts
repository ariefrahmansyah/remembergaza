import { JSONFilePreset } from "lowdb/node";

export type Person = {
  id: string;
  name: string;
  dob: string;
  sex: string;
  age: number;
  source: string;
  en_name: string;
};

export type Summary = {
  gaza?: {
    reports: number;
    last_update: string;
    massacres: number;
    killed: {
      total: number;
      children: number;
      women: number;
      civil_defence: number;
      press: number;
      medical: number;
    };
    injured: {
      total: number;
    };
  };
  west_bank?: {
    reports: number;
    last_update: string;
    settler_attacks: number;
    killed: {
      total: number;
      children: number;
    };
    injured: {
      total: number;
      children: number;
    };
  };
  known_killed_in_gaza?: {
    records: number;
    female: {
      child: number;
      adult: number;
      senior: number;
    };
    male: {
      child: number;
      adult: number;
      senior: number;
    };
  };
  known_press_killed_in_gaza?: {
    records: number;
  };
};

const killedInGazaDb = await JSONFilePreset<Person[]>(
  "./data/killed-in-gaza.min.json",
  []
);

const summaryDb = await JSONFilePreset<Summary>("./data/summary.min.json", {});

export const people = killedInGazaDb.data;

export const totalVictims = summaryDb.data.gaza?.killed.total ?? 0;
export const totalIdentifiedVictims =
  summaryDb.data.known_killed_in_gaza?.records ?? 0;
export const totalUnidentifiedVictims = totalVictims - totalIdentifiedVictims;
