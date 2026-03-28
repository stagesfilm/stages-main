import configPromise from "@payload-config";
import { getPayload } from "payload";

/**
 * Returns a cached Payload instance for use in Server Components.
 * Payload handles its own connection caching internally.
 */
export async function getPayloadClient() {
  return getPayload({ config: configPromise });
}
