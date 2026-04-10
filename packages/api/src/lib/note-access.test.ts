import { describe, expect, it } from "vitest";

import {
  assertCanManageScopedResource,
  canReadScopedResource,
} from "./note-access";

describe("note access helpers", () => {
  const ownerActor = {
    id: "user-1",
    orgId: null,
    schoolId: null,
    classIds: [],
  };

  it("allows public notes without an actor", () => {
    expect(
      canReadScopedResource(null, {
        ownerId: "user-2",
        orgId: null,
        schoolId: null,
        classId: null,
        visibility: "PUBLIC",
      }),
    ).toBe(true);
  });

  it("allows owners to read private notes", () => {
    expect(
      canReadScopedResource(ownerActor, {
        ownerId: "user-1",
        orgId: null,
        schoolId: null,
        classId: null,
        visibility: "PRIVATE",
      }),
    ).toBe(true);
  });

  it("allows authenticated notes for signed-in users", () => {
    expect(
      canReadScopedResource(ownerActor, {
        ownerId: "user-2",
        orgId: null,
        schoolId: null,
        classId: null,
        visibility: "AUTHENTICATED",
      }),
    ).toBe(true);
  });

  it("rejects private notes for non-owners", () => {
    expect(
      canReadScopedResource(ownerActor, {
        ownerId: "user-2",
        orgId: null,
        schoolId: null,
        classId: null,
        visibility: "PRIVATE",
      }),
    ).toBe(false);
  });

  it("rejects org-scoped notes without matching membership", () => {
    expect(
      canReadScopedResource(ownerActor, {
        ownerId: "user-2",
        orgId: "org-1",
        schoolId: null,
        classId: null,
        visibility: "ORG",
      }),
    ).toBe(false);
  });

  it("rejects management actions for non-owners", () => {
    expect(() =>
      assertCanManageScopedResource(ownerActor, {
        ownerId: "user-2",
        orgId: null,
        schoolId: null,
        classId: null,
        visibility: "PRIVATE",
      }),
    ).toThrowError();
  });
});
