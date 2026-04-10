import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";

import { and, desc, eq, isNotNull, isNull } from "@repo/db";
import { Note } from "@repo/db/schema";
import {
  CreateNoteSchema,
  NoteByIdSchema,
  NoteListSchema,
  UpdateNoteSchema,
} from "@repo/validators";

import {
  assertCanManageScopedResource,
  assertCanReadScopedResource,
  assertCanWriteNoteScope,
  getNoteActor,
} from "../lib/note-access";
import { protectedProcedure, publicProcedure } from "../trpc";

export const noteRouter = {
  list: protectedProcedure
    .input(NoteListSchema)
    .query(async ({ ctx, input }) => {
      const actor = getNoteActor(ctx.session.user);
      const statusCondition =
        input.status === "archived"
          ? and(isNull(Note.deletedAt), eq(Note.isArchived, true))
          : input.status === "deleted"
            ? and(eq(Note.ownerId, actor.id), isNotNull(Note.deletedAt))
            : and(isNull(Note.deletedAt), eq(Note.isArchived, false));

      const notes = await ctx.db.query.Note.findMany({
        where: and(eq(Note.ownerId, actor.id), statusCondition),
        orderBy: [desc(Note.updatedAt), desc(Note.id)],
        limit: input.pageSize + 1,
        offset: (input.page - 1) * input.pageSize,
      });

      return {
        items: notes.slice(0, input.pageSize),
        page: input.page,
        pageSize: input.pageSize,
        hasMore: notes.length > input.pageSize,
      };
    }),

  byId: publicProcedure.input(NoteByIdSchema).query(async ({ ctx, input }) => {
    const note = await ctx.db.query.Note.findFirst({
      where: eq(Note.id, input.id),
    });

    if (!note) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    const actor = ctx.session?.user ? getNoteActor(ctx.session.user) : null;

    if (note.deletedAt && actor?.id !== note.ownerId) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    assertCanReadScopedResource(actor, note);

    return note;
  }),

  create: protectedProcedure
    .input(CreateNoteSchema)
    .mutation(async ({ ctx, input }) => {
      const actor = getNoteActor(ctx.session.user);
      assertCanWriteNoteScope(actor, input);

      const [note] = await ctx.db
        .insert(Note)
        .values({
          ownerId: actor.id,
          orgId: input.orgId ?? null,
          schoolId: input.schoolId ?? null,
          classId: input.classId ?? null,
          visibility: input.visibility,
          title: input.title,
          content: input.content,
        })
        .returning();

      return note;
    }),

  update: protectedProcedure
    .input(UpdateNoteSchema)
    .mutation(async ({ ctx, input }) => {
      const actor = getNoteActor(ctx.session.user);
      const existingNote = await ctx.db.query.Note.findFirst({
        where: eq(Note.id, input.id),
      });

      if (!existingNote) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      assertCanManageScopedResource(actor, existingNote);
      assertCanWriteNoteScope(actor, input);

      const [note] = await ctx.db
        .update(Note)
        .set({
          title: input.title,
          content: input.content,
          visibility: input.visibility,
          orgId: input.orgId ?? null,
          schoolId: input.schoolId ?? null,
          classId: input.classId ?? null,
        })
        .where(eq(Note.id, input.id))
        .returning();

      return note;
    }),

  archive: protectedProcedure
    .input(NoteByIdSchema)
    .mutation(async ({ ctx, input }) => {
      const actor = getNoteActor(ctx.session.user);
      const note = await ctx.db.query.Note.findFirst({
        where: eq(Note.id, input.id),
      });

      if (!note) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      assertCanManageScopedResource(actor, note);

      const [updatedNote] = await ctx.db
        .update(Note)
        .set({
          isArchived: true,
        })
        .where(eq(Note.id, input.id))
        .returning();

      return updatedNote;
    }),

  restore: protectedProcedure
    .input(NoteByIdSchema)
    .mutation(async ({ ctx, input }) => {
      const actor = getNoteActor(ctx.session.user);
      const note = await ctx.db.query.Note.findFirst({
        where: eq(Note.id, input.id),
      });

      if (!note) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      assertCanManageScopedResource(actor, note);

      const [updatedNote] = await ctx.db
        .update(Note)
        .set({
          isArchived: false,
          deletedAt: null,
        })
        .where(eq(Note.id, input.id))
        .returning();

      return updatedNote;
    }),

  delete: protectedProcedure
    .input(NoteByIdSchema)
    .mutation(async ({ ctx, input }) => {
      const actor = getNoteActor(ctx.session.user);
      const note = await ctx.db.query.Note.findFirst({
        where: eq(Note.id, input.id),
      });

      if (!note) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      assertCanManageScopedResource(actor, note);

      const [updatedNote] = await ctx.db
        .update(Note)
        .set({
          deletedAt: new Date(),
        })
        .where(eq(Note.id, input.id))
        .returning();

      return updatedNote;
    }),
} satisfies TRPCRouterRecord;
