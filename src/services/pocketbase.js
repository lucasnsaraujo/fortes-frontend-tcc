import Pocketbase from "pocketbase";

const PROD_URL = "https://pocketbase-production-12bb.up.railway.app";

export const pb = new Pocketbase(PROD_URL);
