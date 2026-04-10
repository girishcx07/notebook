import { TRPCError } from "@trpc/server";

import type { NoteVisibility } from "@repo/validators";

interface ScopedActor {
  classIds: string[];
  id: string;
  orgId: null | string;
  schoolId: null | string;
}

interface ScopedResource {
  classId: null | string;
  orgId: null | string;
  ownerId: string;
  schoolId: null | string;
  visibility: NoteVisibility;
}

export function getNoteActor(sessionUser: { id: string }) {
  return {
    id: sessionUser.id,
    orgId: null,
    schoolId: null,
    classIds: [],
  } satisfies ScopedActor;
}

export function canReadScopedResource(
  actor: null | ScopedActor,
  resource: ScopedResource,
) {
  if (resource.visibility === "PUBLIC") {
    return true;
  }

  if (!actor) {
    return false;
  }

  if (resource.ownerId === actor.id) {
    return true;
  }

  if (resource.visibility === "AUTHENTICATED") {
    return true;
  }

  if (resource.visibility === "ORG" && actor.orgId === resource.orgId) {
    return true;
  }

  if (
    resource.visibility === "SCHOOL" &&
    actor.schoolId === resource.schoolId
  ) {
    return true;
  }

  if (
    resource.visibility === "CLASS" &&
    resource.classId &&
    actor.classIds.includes(resource.classId)
  ) {
    return true;
  }

  return false;
}

export function assertCanReadScopedResource(
  actor: null | ScopedActor,
  resource: ScopedResource,
) {
  if (!canReadScopedResource(actor, resource)) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }
}

export function assertCanManageScopedResource(
  actor: ScopedActor,
  resource: ScopedResource,
) {
  if (resource.ownerId !== actor.id) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
}

export function assertCanWriteNoteScope(
  actor: ScopedActor,
  input: {
    classId?: null | string | undefined;
    orgId?: null | string | undefined;
    schoolId?: null | string | undefined;
    visibility: NoteVisibility;
  },
) {
  if (input.orgId && input.orgId !== actor.orgId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You cannot assign a note to another organization scope",
    });
  }

  if (input.schoolId && input.schoolId !== actor.schoolId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You cannot assign a note to another school scope",
    });
  }

  if (input.classId && !actor.classIds.includes(input.classId)) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You cannot assign a note to a class you do not belong to",
    });
  }

  if (input.visibility === "ORG" && !actor.orgId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message:
        "Organization-scoped notes are not available for this account yet",
    });
  }

  if (input.visibility === "SCHOOL" && !actor.schoolId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "School-scoped notes are not available for this account yet",
    });
  }

  if (input.visibility === "CLASS" && actor.classIds.length === 0) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Class-scoped notes are not available for this account yet",
    });
  }
}

export type { ScopedActor, ScopedResource };
