"use client";

import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

const Tiptap = ({ mainContent, onChange, placeholder }: { mainContent: string; placeholder: string; onChange: (richText: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading to use our configured one
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2], // Only allow h2 headings
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-4",
        },
      }),
      ListItem.configure(),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 hover:underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Code.configure({
        HTMLAttributes: {
          class: "bg-gray-100 p-1 rounded font-mono",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-gray-300 pl-4 italic",
        },
      }),
      Strike.configure(),
      Placeholder.configure({
        placeholder: placeholder || "Type your content here...",
      }),
    ],
    content: mainContent || "",
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[250px] border-[#27272A] p-2 mt-2 bg-background focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
