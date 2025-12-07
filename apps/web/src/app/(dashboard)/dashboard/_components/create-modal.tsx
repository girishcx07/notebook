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
import { FolderTreeIcon, type LucideIcon, NotebookPenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";

type CreateType = "note" | "workspace" | "";

interface CreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateModal({ open, onOpenChange }: CreateModalProps) {
  const router = useRouter();

  const [type, setType] = useState<CreateType>("");

  const handleClose = () => {
    onOpenChange(false);
    setType("");
  };

  const handleContinue = () => {
    if (type === "note") {
      router.push("/dashboard/notes/new");
    } else if (type === "workspace") {
      router.push("/dashboard/workspaces/new");
    }
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Choose what you'd like to create
          </p>
        </DialogHeader>

        <div className="w-full px-2 py-4">
          <RadioGroup
            className="gap-3"
            value={type}
            onValueChange={(v) => setType(v as CreateType)}
          >
            <RadioCard
              title="Note"
              description="Create a new note to capture your thoughts and ideas"
              icon={NotebookPenIcon}
              value="note"
              isSelected={type === "note"}
            />
            <RadioCard
              title="Workspace"
              description="Create a workspace to organize multiple notes together"
              icon={FolderTreeIcon}
              value="workspace"
              isSelected={type === "workspace"}
            />
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={!type} onClick={handleContinue}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Reusable Radio Card Component
interface RadioCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  value: string;
  isSelected: boolean;
}

const RadioCard = ({
  title,
  description,
  icon: Icon,
  value,
  isSelected,
}: RadioCardProps) => {
  const id = useId();
  const nameId = `${id}-${value}`;
  const descriptionId = `${id}-${value}-description`;

  return (
    <Label htmlFor={nameId} className="cursor-pointer">
      <div
        className={cn(
          "relative flex w-full items-start gap-2 rounded-lg border border-border p-4 shadow-sm transition-all hover:bg-accent/50",
          isSelected && "bg-primary/10 border-primary ring-2 ring-primary/20"
        )}
      >
        <div className="flex grow items-start gap-3">
          <Icon
            className={cn("h-5 w-5 mt-0.5", isSelected && "text-primary")}
          />
          <div className="grid grow gap-1">
            <div className={cn("font-medium", isSelected && "text-primary")}>
              {title}
            </div>
            <p className="text-xs text-muted-foreground" id={descriptionId}>
              {description}
            </p>
          </div>
        </div>
        <RadioGroupItem
          aria-describedby={descriptionId}
          className="after:absolute after:inset-0"
          id={nameId}
          value={value}
        />
      </div>
    </Label>
  );
};
