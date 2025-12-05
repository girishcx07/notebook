"use client";

import { Button } from "@notebook/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@notebook/ui/components/dialog";
import { Label } from "@notebook/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@notebook/ui/components/radio-group";
import { cn } from "@notebook/ui/lib/utils";
import { FolderTreeIcon, LucideIcon, NotebookPenIcon } from "lucide-react";
import React, { useId, useState } from "react";

type CreateType = "note" | "workspace";

export interface WorkspaceOption {
  id: string;
  title: string;
}

interface CreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SectionType = "first" | "second";

export default function CreateModal({ open, onOpenChange }: CreateModalProps) {
  const [type, setType] = useState<CreateType | string>("");
  const [section, setSection] = useState<SectionType>("first");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {section === "first" ? (
          <SectionFirst
            type={type}
            setType={setType}
            onSectionChange={setSection}
          />
        ) : (
          <SectionSecond onSectionChange={setSection} />
        )}
      </DialogContent>
    </Dialog>
  );
}

const SectionFirst = ({
  type,
  setType,
  onSectionChange,
}: {
  type: CreateType | string;
  setType: (type: CreateType) => void;
  onSectionChange: (section: SectionType) => void;
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create</DialogTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Choose what to create and where it will appear.
        </p>
      </DialogHeader>

      <div className="w-full px-2">
        <RadioGroup className="gap-2" value={type} onValueChange={setType}>
          <RadioCard
            title="Note"
            description="Create a new note to store your thoughts."
            icon={NotebookPenIcon}
            name="note"
            value="note"
            isSelected={type === "note"}
          />
          <RadioCard
            title="Workspace"
            description="Create a workspace to store multiple notes."
            icon={FolderTreeIcon}
            name="workspace"
            value="workspace"
            isSelected={type === "workspace"}
          />
        </RadioGroup>
      </div>
      <DialogFooter>
        <Button
          disabled={!type}
          type="button"
          onClick={() => onSectionChange("second")}
        >
          Next
        </Button>
      </DialogFooter>
    </>
  );
};

const SectionSecond = ({
  onSectionChange,
}: {
  onSectionChange: (section: SectionType) => void;
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create</DialogTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Choose what to create and where it will appear.
        </p>
      </DialogHeader>
      <div className="w-full px-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit a, ullam
        consequatur voluptatem pariatur corporis eum nulla doloribus nobis aut
        assumenda ex, aperiam officia fugiat! Dolor quia esse aperiam accusamus.
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onSectionChange("first")}
        >
          Back
        </Button>
        <Button type="button" onClick={() => onSectionChange("second")}>
          Next
        </Button>
      </DialogFooter>
    </>
  );
};

const CreateWorkspaceForm = ({
  onSectionChange,
}: {
  onSectionChange: (section: SectionType) => void;
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create</DialogTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Choose what to create and where it will appear.
        </p>
      </DialogHeader>
      <div className="w-full px-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit a, ullam
        consequatur voluptatem pariatur corporis eum nulla doloribus nobis aut
        assumenda ex, aperiam officia fugiat! Dolor quia esse aperiam accusamus.
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onSectionChange("first")}
        >
          Back
        </Button>
        <Button type="button" onClick={() => onSectionChange("second")}>
          Next
        </Button>
      </DialogFooter>
    </>
  );
};

const RadioCard = ({
  title,
  description,
  icon: Icon,
  name,
  value,
  isSelected,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  name: string;
  value: string;
  isSelected: boolean;
}) => {
  const id = useId();
  const nameId = `${id}-${name}`;
  const descriptionId = `${id}-${name}-description`;

  return (
    <Label htmlFor={nameId}>
      <div
        className={cn(
          "relative flex w-full items-start gap-2 rounded-md border border-border p-4 shadow-xs outline-none",
          isSelected && "bg-primary/10 text-primary border-primary"
        )}
      >
        <div className="flex grow items-start gap-3">
          <Icon />
          <div className="grid grow gap-2">
            {/* <Label htmlFor={nameId}> */}
            {title}
            {/* </Label> */}
            <p className="text-muted-foreground text-xs" id={descriptionId}>
              {description}
            </p>
          </div>
        </div>
        <RadioGroupItem
          aria-describedby={descriptionId}
          className="order-1 after:absolute after:inset-0"
          id={nameId}
          value={value}
        />
      </div>
    </Label>
  );
};
