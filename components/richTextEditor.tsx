'use client'

import './styles.scss'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Underline from '@tiptap/extension-underline'
import Document from '@tiptap/extension-document'
import Gapcursor from '@tiptap/extension-gapcursor'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import { Icons } from '@/components/ui/icons'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import Heading from '@tiptap/extension-heading'
import { mergeAttributes } from '@tiptap/core'

const TableMenu = ({ editor }: any) => [
  {
    id: 1,
    name: 'Insert Table',
    action: () =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
  },
  {
    id: 2,
    name: 'Add Column Before',
    action: () => editor.chain().focus().addColumnBefore().run(),
  },
  {
    id: 3,
    name: 'Add Column After',
    action: () => editor.chain().focus().addColumnAfter().run(),
  },
  {
    id: 4,
    name: 'Delete Column',
    action: () => editor.chain().focus().deleteColumn().run(),
  },
  {
    id: 5,
    name: 'Add Row Before',
    action: () => editor.chain().focus().addRowBefore().run(),
  },
  {
    id: 6,
    name: 'Add Row After',
    action: () => editor.chain().focus().addRowAfter().run(),
  },
  {
    id: 7,
    name: 'Delete Row',
    action: () => editor.chain().focus().deleteRow().run(),
  },
  {
    id: 8,
    name: 'Delete Table',
    action: () => editor.chain().focus().deleteTable().run(),
  },
  {
    id: 9,
    name: 'Merge Cells',
    action: () => editor.chain().focus().mergeCells().run(),
  },
  {
    id: 11,
    name: 'Toggle Header Column',
    action: () => editor.chain().focus().toggleHeaderColumn().run(),
  },
  {
    id: 12,
    name: 'Toggle Header Row',
    action: () => editor.chain().focus().toggleHeaderRow().run(),
  },
  {
    id: 13,
    name: 'Toggle Header Cell',
    action: () => editor.chain().focus().toggleHeaderCell().run(),
  },
  {
    id: 14,
    name: 'Merge Or Split',
    action: () => editor.chain().focus().mergeOrSplit().run(),
  },
  {
    id: 15,
    name: 'Set Cell Attribute',
    action: () => editor.chain().focus().setCellAttribute('colspan', 2).run(),
  },
]

const MenuBarIcon = ({ editor }: any) => [
  {
    id: 1,
    name: 'bold',
    icon: Icons.bold,
    onClick: () => editor.chain().focus().toggleBold().run(),
    disable: !editor.can().chain().focus().toggleBold().run(),
    isActive: editor.isActive('bold') ? 'is-active text-green-700' : '',
    hover: false,
  },
  {
    id: 2,
    name: 'italic',
    icon: Icons.italic,
    onClick: () => editor.chain().focus().toggleItalic().run(),
    disable: !editor.can().chain().focus().toggleItalic().run(),
    isActive: editor.isActive('italic') ? 'is-active text-green-700' : '',
    hover: false,
  },
  {
    id: 21,
    name: 'underline',
    icon: Icons.underline,
    onClick: () => editor.chain().focus().toggleUnderline().run(),
    disable: false,
    isActive: editor.isActive('underline') ? 'is-active text-green-700' : '',
    hover: false,
  },
  {
    id: 3,
    name: 'strike',
    icon: Icons.strikethrough,
    onClick: () => editor.chain().focus().toggleStrike().run(),
    disable: !editor.can().chain().focus().toggleStrike().run(),
    isActive: editor.isActive('strike') ? 'is-active text-green-700' : '',
    hover: false,
  },
  {
    id: 4,
    name: 'heading1',
    icon: Icons.h1,
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 1 })
      ? 'is-active text-green-700'
      : '',
    hover: false,
  },
  {
    id: 6,
    name: 'heading2',
    icon: Icons.h2,
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 2 })
      ? 'is-active text-green-700'
      : '',
    hover: false,
  },
  {
    id: 13,
    name: 'heading3',
    icon: Icons.h3,
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 3 })
      ? 'is-active text-green-700'
      : '',
    hover: false,
  },
  {
    id: 14,
    name: 'heading4',
    icon: Icons.h4,
    onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 4 })
      ? 'is-active text-green-700'
      : '',
    hover: false,
  },
  {
    id: 15,
    name: 'heading5',
    icon: Icons.h5,
    onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 5 })
      ? 'is-active text-green-700'
      : '',
    hover: false,
  },
  {
    id: 7,
    name: 'paragraph',
    icon: Icons.paragraph,
    onClick: () => editor.chain().focus().setParagraph().run(),
    disable: false,
    isActive: editor.isActive('paragraph') ? 'is-active text-green-700' : '',
    hover: false,
  },
  {
    id: 8,
    name: 'bullet list',
    icon: Icons.ul,
    onClick: () => editor.chain().focus().toggleBulletList().run(),
    disable: false,
    isActive: editor.isActive('bulletList')
      ? 'is-active text-green-700 list-disc'
      : '',
    hover: false,
  },
  {
    id: 9,
    name: 'ordered list',
    icon: Icons.ol,
    onClick: () => editor.chain().focus().toggleOrderedList().run(),
    disable: false,
    isActive: editor.isActive('orderedList')
      ? 'is-active text-green-700 list-decimal'
      : '',
    hover: false,
  },
  {
    id: 20,
    name: 'highlight',
    icon: Icons.bg,
    onClick: () => editor.chain().focus().toggleHighlight().run(),
    disable: false,
    isActive: editor.isActive('highlight') ? 'is-active text-green-700' : '',
    hover: false,
  },
  {
    id: 16,
    name: 'align left',
    icon: Icons.alignLeft,
    onClick: () => editor.chain().focus().setTextAlign('left').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'left' }) ? 'is-active' : '',
    hover: false,
  },
  {
    id: 17,
    name: 'align center',
    icon: Icons.alignCenter,
    onClick: () => editor.chain().focus().setTextAlign('center').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'center' })
      ? 'is-active text-green-700 text-center'
      : '',
    hover: false,
  },
  {
    id: 18,
    name: 'align right',
    icon: Icons.alignRight,
    onClick: () => editor.chain().focus().setTextAlign('right').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'right' }) ? 'is-active' : '',
    hover: false,
  },
  {
    id: 19,
    name: 'align justify',
    icon: Icons.alignJustify,
    onClick: () => editor.chain().focus().setTextAlign('justify').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'justify' }) ? 'is-active' : '',
    hover: false,
  },
  {
    id: 10,
    name: 'code block',
    icon: Icons.codeblock,
    onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    disable: false,
    isActive: editor.isActive('codeBlock') ? 'is-active text-green-700' : '',
    hover: false,
  },
  {
    id: 11,
    name: 'blockquote',
    icon: Icons.blockquote,
    onClick: () => editor.chain().focus().toggleBlockquote().run(),
    disable: false,
    isActive: editor.isActive('blockquote') ? 'is-active text-green-700' : '',
    hover: false,
  },
  // {
  //   id: 12,
  //   name: 'table',
  //   icon: Icons.table,
  //   onClick: () =>
  //     editor
  //       .chain()
  //       .focus()
  //       .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
  //       .run(),
  //   disable: false,
  //   isActive: editor.isActive('table') ? 'is-active text-green-700' : '',
  //   hover: true,
  // },
]

function MenuBar({ editor }: any) {
  if (!editor) {
    return null
  }
  const MenuBarIconValue = MenuBarIcon({ editor })

  return (
    <div className="flex items-center gap-2 bg-slate-600 p-2 text-white w-full rounded-t-2xl border-b-2 border-b-black">
      <input
        type="color"
        onInput={(event: any) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes('textStyle').color}
      />
      {MenuBarIconValue.map((item) =>
        item.hover ? (
          <Menubar className="bg-transparent border-none" key={item.id}>
            <MenubarMenu>
              <MenubarTrigger className="p-0">
                <button
                  key={item.id}
                  onClick={item.onClick}
                  disabled={item.disable}
                  className={`${
                    item.disable ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <item.icon />
                </button>
              </MenubarTrigger>
              <MenubarContent>
                {TableMenu({ editor }).map((menuItem) => (
                  <MenubarItem key={menuItem.id} onClick={menuItem.action}>
                    {menuItem.name}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ) : (
          <button
            key={item.id}
            onClick={item.onClick}
            disabled={item.disable}
            className={`${
              item.disable ? 'cursor-not-allowed' : 'cursor-pointer'
            } + ${item.isActive ? item.isActive : ''}`}
          >
            <item.icon />
          </button>
        )
      )}
    </div>
  )
}

type TiptapProps = {
  content: string
  setContent: (content: string) => void
  placeholder: string
  isCreator: boolean
}

const classes: Record<number, string> = {
  1: 'text-4xl',
  2: 'text-3xl',
  3: 'text-2xl',
  4: 'text-xl',
  5: 'text-lg',
  6: 'text-md',
  7: 'text-sm',
}

export default function Tiptap(props: TiptapProps) {
  const { setContent, content, placeholder, isCreator } = props

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as any),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        heading: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline.configure({
        HTMLAttributes: {
          class: 'my-custom-class',
        },
      }),
      Heading.configure({ levels: [1, 2, 3, 4, 5] }).extend({
        levels: [1, 2, 3, 4, 5],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0]
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ]
        },
      }),
      Highlight,
      Document,
      Paragraph,
      Text,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder }),
    ],
    editorProps: {
      attributes: {
        class: 'm-2 focus:outline-none',
      },
    },
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
    onCreate({ editor }) {
      editor.setEditable(isCreator)
      editor?.chain().focus().insertContent(content).run()
    },
  })

  return (
    <div
      className={`min-w-[700px]  border-2 rounded-2xl ${
        isCreator ? 'border-slate-200' : 'border-slate-400'
      }`}
    >
      <MenuBar editor={editor} />
      <EditorContent
        className={`w-full p-3 max-h-[600px] overflow-auto min-h-[100px] rounded-b-xl text-black ${
          isCreator ? 'bg-slate-200' : 'bg-slate-400'
        }`}
        editor={editor}
      />
    </div>
  )
}