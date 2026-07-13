import type { MetaType } from "../types/meta.type";

export async function getMetaData(): Promise<MetaType> {
  try {
    const reponse = await fetch(`/api/meta`);
    if (!reponse.ok) {
      throw new Error("error in fetching meta data");
    }
    const data = (await reponse.json()) as MetaType;
    return data;
  } catch (err) {
    console.log("error in meta service", err);
    throw err;
  }
}
