"use client";

import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { type Editor } from "@tiptap/react";
import { Bold, Code, Heading2, Italic, List, ListOrdered, Strikethrough } from "lucide-react";

type Props = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-background rounded-lg p-1 flex flex-wrap items-center gap-1 shadow-sm">
      {/* Text Formatting Group */}
      <div className="flex items-center gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aria-label="Heading"
          className="px-2 py-1 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
          className="px-2 py-1 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
          className="px-2 py-1 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strikethrough"
          className="px-2 py-1 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("code")}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
          aria-label="Code"
          className="px-2 py-1 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        >
          <Code className="h-4 w-4" />
        </Toggle>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Lists & Block Group */}
      <div className="flex items-center gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet List"
          className="px-2 py-1 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        >
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Numbered List"
          className="px-2 py-1 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />
    </div>
  );
}
