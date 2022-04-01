import { PLUGIN_NAME } from "../constants"

export function debug(text) {
  console.log(`[Plugin][${PLUGIN_NAME}]`, text)
}