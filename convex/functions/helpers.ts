import {
  customQuery,
  customCtx,
  customMutation,
} from "convex-helpers/server/customFunctions";
import { getCurrentUser } from "./user";
import { mutation, query } from "../_generated/server";
export const authenticatedQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    return { user };
  })
);

export const authenticationMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      console.log(1);
      throw new Error("Unauthorized");
    }
    return { user };
  })
);
