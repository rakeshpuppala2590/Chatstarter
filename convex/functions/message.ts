import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
//  query is a function that fetches data
// mutation that modifies the messages table

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});

export const create = mutation({
  args: {
    sender: v.string(),
    content: v.string(),
  },
  handler: async (ctx, { sender, content }) => {
    await ctx.db.insert("messages", { sender, content });
  },
});
