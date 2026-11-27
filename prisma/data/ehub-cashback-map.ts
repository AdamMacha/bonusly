/**
 * Ověřená metadata pro evidenci provizí a pravidel cashbacku z eHUB.cz
 * (včetně tvrdého zámku cashbackAllowed: false pro programy zakazující cashback).
 * Uživatelské štítky počítají s výchozím dělením 50 % uživateli / 50 % BONUSLY.
 */

import { NEW_EHUB_CASHBACK_MAP } from "./ehub-cashback-map-new";
import { CJ_CASHBACK_MAP } from "./cj-cashback-map";

export interface OfferCashbackMeta {
  ehubCampaignId?: string | null;
  cashbackAllowed: boolean;
  partnerCommissionRate?: string | null;
  cashbackSharePct?: number | null;
  userCashbackLabel?: string | null;
}

export const OFFER_CASHBACK_MAP: Record<string, OfferCashbackMeta> = {
  ...NEW_EHUB_CASHBACK_MAP,
  ...CJ_CASHBACK_MAP,
  // --- Přímé spolupráce mimo eHUB ---
  revolut: {
    cashbackAllowed: true,
    partnerCommissionRate: "Referral 1 750 Kč",
    userCashbackLabel: "BONUSLY odměna 500 Kč",
  },

  // --- eHUB schválené programy: CASHBACK ZAKÁZÁN (tvrdý zámek!) ---
  flowpay: {
    ehubCampaignId: "494b1fbf",
    cashbackAllowed: false,
    partnerCommissionRate: "PPS 0,65 % (až 16 250 Kč)",
    userCashbackLabel: null,
  },
  "raiffeisenbank-pujcka": {
    ehubCampaignId: "d34497f9",
    cashbackAllowed: false,
    partnerCommissionRate: "PPS 2,00 %",
    userCashbackLabel: null,
  },
  "raiffeisenbank-kreditni-karta": {
    ehubCampaignId: "50b4f64b",
    cashbackAllowed: false,
    partnerCommissionRate: "PPA 1 100 Kč",
    userCashbackLabel: null,
  },
  jabkolevne: {
    ehubCampaignId: "3337b1fb",
    cashbackAllowed: false,
    partnerCommissionRate: "PPS 300 Kč (s kódem sleva600)",
    userCashbackLabel: null,
  },
  cernyrytir: {
    ehubCampaignId: "37d832d8",
    cashbackAllowed: false,
    partnerCommissionRate: "PPS 0,00–8,00 %",
    userCashbackLabel: null,
  },

  // --- eHUB Batch 3 schválené programy: CASHBACK POVOLEN (50 % z reálné provize) ---
  pomelobox: {
    ehubCampaignId: "0c675c54",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 12,00 %",
    userCashbackLabel: "Cashback 6 %",
  },
  tentino: {
    ehubCampaignId: "fab8fdf5",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 4,00–6,40 %",
    userCashbackLabel: "Cashback až 3,2 %",
  },
  "vse-pro-strechu": {
    ehubCampaignId: "5fc79bd6",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 6,00 %",
    userCashbackLabel: "Cashback 3 %",
  },
  armyfantasy: {
    ehubCampaignId: "f0cf1830",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 7,00 %",
    userCashbackLabel: "Cashback 3,5 %",
  },
  rucedozadu: {
    ehubCampaignId: "44c0cedc",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 8,00 %",
    userCashbackLabel: "Cashback 4 %",
  },
  svetfyzioterapie: {
    ehubCampaignId: "d2ff8752",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 8,00 %",
    userCashbackLabel: "Cashback 4 %",
  },
  trikon: {
    ehubCampaignId: "25fa0a91",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 8,00 %",
    userCashbackLabel: "Cashback 4 %",
  },

  // --- eHUB schválené programy: CASHBACK POVOLEN (50 % z reálné provize) ---
  brilianty: {
    ehubCampaignId: "75cabc6c",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 7,50 %",
    userCashbackLabel: "Cashback 3,75 %",
  },
  iphonemarket: {
    ehubCampaignId: "ff360e3f",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 4,00 %",
    userCashbackLabel: "Cashback 2 %",
  },
  istyle: {
    ehubCampaignId: "acd7e05e",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 0,40–6,40 %",
    userCashbackLabel: "Cashback až 3,2 %",
  },
  sencor: {
    ehubCampaignId: "b63c35d0",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 6,80 %",
    userCashbackLabel: "Cashback 3,4 %",
  },
  dronpro: {
    ehubCampaignId: "a309dd83",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 4,80 %",
    userCashbackLabel: "Cashback 2,4 %",
  },
  banggood: {
    ehubCampaignId: "314972a2",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 6,00–13,00 %",
    userCashbackLabel: "Cashback až 6,5 %",
  },
  aliexpress: {
    ehubCampaignId: "3c3ff454",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 0,60–7,00 %",
    userCashbackLabel: "Cashback až 3,5 %",
  },
  spime: {
    ehubCampaignId: "06f98066",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 3,20 %",
    userCashbackLabel: "Cashback 1,6 %",
  },
  marimex: {
    ehubCampaignId: "842b8086",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 0,00–5,00 %",
    userCashbackLabel: "Cashback až 2,5 %",
  },
  ventilatory: {
    ehubCampaignId: "fb628e5c",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 10,00 %",
    userCashbackLabel: "Cashback 5 %",
  },
  originalnipneu: {
    ehubCampaignId: "acb775ef",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 2,20 %",
    userCashbackLabel: "Cashback 1,1 %",
  },
  "honzovy-longboardy": {
    ehubCampaignId: "8f40ae60",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 2,40–4,00 %",
    userCashbackLabel: "Cashback až 2 %",
  },
  "ministerstvo-hracek": {
    ehubCampaignId: "0b95b145",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 5,60 %",
    userCashbackLabel: "Cashback 2,8 %",
  },
  eroticcity: {
    ehubCampaignId: "d7879887",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 8,00 %",
    userCashbackLabel: "Cashback 4 %",
  },
  "patria-finance": {
    ehubCampaignId: "232225f8",
    cashbackAllowed: true,
    partnerCommissionRate: "PPA 625 Kč",
    userCashbackLabel: "Cashback 310 Kč",
  },
  portu: {
    ehubCampaignId: "542ce09b",
    cashbackAllowed: true,
    partnerCommissionRate: "PPL 150 Kč / PPA 400 Kč",
    userCashbackLabel: "Cashback až 200 Kč",
  },
  "portu-gallery": {
    ehubCampaignId: "ad4a83d1",
    cashbackAllowed: true,
    partnerCommissionRate: "PPL 200 Kč",
    userCashbackLabel: "Cashback 100 Kč",
  },
  roier: {
    ehubCampaignId: "1358a18b",
    cashbackAllowed: true,
    partnerCommissionRate: "PPL 100–300 Kč / PPA 900 Kč",
    userCashbackLabel: "Cashback až 450 Kč",
  },
  rondainvest: {
    ehubCampaignId: "debd4c24",
    cashbackAllowed: true,
    partnerCommissionRate: "PPL 500 Kč",
    userCashbackLabel: "Cashback 250 Kč",
  },
  "raiffeisenbank-podnikatelsky-ucet": {
    ehubCampaignId: "eedfe936",
    cashbackAllowed: true,
    partnerCommissionRate: "PPA 1 000 Kč",
    userCashbackLabel: "Cashback 500 Kč",
  },
  "mbank-sporici-ucet": {
    ehubCampaignId: "c14ec746",
    cashbackAllowed: true,
    partnerCommissionRate: "PPL 150 Kč / PPS 500 Kč",
    userCashbackLabel: "Cashback až 250 Kč",
  },
  stalynajem: {
    ehubCampaignId: "4c81db64",
    cashbackAllowed: true,
    partnerCommissionRate: "PPL 5 600 Kč",
    userCashbackLabel: "Cashback až 2 800 Kč",
  },
  "csob-pojistovna": {
    ehubCampaignId: "174174d6",
    cashbackAllowed: true,
    partnerCommissionRate: "PPS 16–65 % / PPL 100 Kč",
    userCashbackLabel: "Cashback až 32 %",
  },
  vodafone: {
    ehubCampaignId: "6965053d",
    cashbackAllowed: true,
    partnerCommissionRate: "PPL 240–2 000 Kč",
    userCashbackLabel: "Cashback až 1 000 Kč",
  },
  innogy: {
    ehubCampaignId: "3b1ee397",
    cashbackAllowed: true,
    partnerCommissionRate: "PPL 240 Kč",
    userCashbackLabel: "Cashback 120 Kč",
  },
  eon: {
    ehubCampaignId: "40b76033",
    cashbackAllowed: true,
    partnerCommissionRate: "PPL 300 Kč",
    userCashbackLabel: "Cashback 150 Kč",
  },
};
