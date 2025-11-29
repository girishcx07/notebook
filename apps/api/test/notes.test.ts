import { describe, it, expect, vi, beforeEach } from "vitest";
import app from "../src";

const mocks = vi.hoisted(() => {
  const mockReturning = vi.fn();
  const mockLimit = vi.fn();
  const mockOrderBy = vi.fn().mockReturnValue({ limit: mockLimit });
  const mockWhere = vi.fn().mockReturnValue({
    returning: mockReturning,
    limit: mockLimit,
    orderBy: mockOrderBy,
  });
  const mockValues = vi.fn().mockReturnValue({ returning: mockReturning });
  const mockSet = vi.fn().mockReturnValue({ where: mockWhere });
  const mockFrom = vi
    .fn()
    .mockReturnValue({ where: mockWhere, orderBy: mockOrderBy });
  const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });
  const mockInsert = vi.fn().mockReturnValue({ values: mockValues });
  const mockUpdate = vi.fn().mockReturnValue({ set: mockSet });
  const mockDelete = vi.fn().mockReturnValue({ where: mockWhere });

  return {
    mockReturning,
    mockWhere,
    mockValues,
    mockSet,
    mockLimit,
    mockOrderBy,
    mockFrom,
    mockSelect,
    mockInsert,
    mockUpdate,
    mockDelete,
  };
});

vi.mock("@notebook/db", () => ({
  db: {
    select: mocks.mockSelect,
    insert: mocks.mockInsert,
    update: mocks.mockUpdate,
    delete: mocks.mockDelete,
  },
  note: {
    id: "id",
    title: "title",
    content: "content",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    pinned: "pinned",
  },
}));

vi.mock("drizzle-orm", () => ({
  eq: vi.fn(),
  desc: vi.fn(),
}));

describe("Notes API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new note", async () => {
    const newNote = {
      id: "test-id",
      title: "Test Note",
      content: "Test Content",
      userId: "user-1",
    };

    mocks.mockReturning.mockResolvedValue([newNote]);

    const res = await app.request("/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test Note",
        content: "Test Content",
        userId: "user-1",
      }),
    });

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual(newNote);
    expect(mocks.mockInsert).toHaveBeenCalled();
  });

  it("should get a note by id", async () => {
    const note = { id: "test-id", title: "Test Note" };
    mocks.mockLimit.mockResolvedValue([note]);

    const res = await app.request("/notes/test-id");

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(note);
  });

  it("should return 404 if note not found", async () => {
    mocks.mockLimit.mockResolvedValue([]);

    const res = await app.request("/notes/non-existent");

    expect(res.status).toBe(404);
  });

  it("should get recent notes", async () => {
    const recentNotes = [
      { id: "1", title: "Note 1" },
      { id: "2", title: "Note 2" },
    ];
    mocks.mockLimit.mockResolvedValue(recentNotes);

    const res = await app.request("/notes/recent");

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(recentNotes);
    expect(mocks.mockOrderBy).toHaveBeenCalled();
  });
});
