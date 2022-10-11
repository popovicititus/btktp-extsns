import { Extension } from '@tiptap/core';
import { Bold } from '@tiptap/extension-bold';
import { BulletList } from '@tiptap/extension-bullet-list';
import { Code } from '@tiptap/extension-code';
import { CodeBlock } from '@tiptap/extension-code-block';
import { Document } from '@tiptap/extension-document';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { Heading } from '@tiptap/extension-heading';
import { History } from '@tiptap/extension-history';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Italic } from '@tiptap/extension-italic';
import { ListItem } from '@tiptap/extension-list-item';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Strike } from '@tiptap/extension-strike';
import { Text } from '@tiptap/extension-text';
import { Placeholder } from "@tiptap/extension-placeholder";
import { Link } from "@tiptap/extension-link";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
export const StarterKit = Extension.create({
    name: 'starterKit',
    addExtensions() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        const extensions = [];
        if (this.options.bold !== false) {
            extensions.push(Bold.configure((_a = this.options) === null || _a === void 0 ? void 0 : _a.bold));
        }
        if (this.options.bulletList !== false) {
            extensions.push(BulletList.configure((_b = this.options) === null || _b === void 0 ? void 0 : _b.bulletList));
        }
        if (this.options.code !== false) {
            extensions.push(Code.configure((_c = this.options) === null || _c === void 0 ? void 0 : _c.code));
        }
        if (this.options.codeBlock !== false) {
            extensions.push(CodeBlock.configure((_d = this.options) === null || _d === void 0 ? void 0 : _d.codeBlock));
        }
        if (this.options.document !== false) {
            extensions.push(Document.configure((_e = this.options) === null || _e === void 0 ? void 0 : _e.document));
        }
        if (this.options.dropcursor !== false) {
            extensions.push(Dropcursor.configure((_f = this.options) === null || _f === void 0 ? void 0 : _f.dropcursor));
        }
        if (this.options.gapcursor !== false) {
            extensions.push(Gapcursor.configure((_g = this.options) === null || _g === void 0 ? void 0 : _g.gapcursor));
        }
        if (this.options.heading !== false) {
            extensions.push(Heading.configure((_h = this.options) === null || _h === void 0 ? void 0 : _h.heading));
        }
        if (this.options.history !== false) {
            extensions.push(History.configure((_j = this.options) === null || _j === void 0 ? void 0 : _j.history));
        }
        if (this.options.horizontalRule !== false) {
            extensions.push(HorizontalRule.configure((_k = this.options) === null || _k === void 0 ? void 0 : _k.horizontalRule));
        }
        if (this.options.italic !== false) {
            extensions.push(Italic.configure((_l = this.options) === null || _l === void 0 ? void 0 : _l.italic));
        }
        if (this.options.listItem !== false) {
            extensions.push(ListItem.configure((_m = this.options) === null || _m === void 0 ? void 0 : _m.listItem));
        }
        if (this.options.orderedList !== false) {
            extensions.push(OrderedList.configure((_o = this.options) === null || _o === void 0 ? void 0 : _o.orderedList));
        }
        if (this.options.paragraph !== false) {
            extensions.push(Paragraph.configure((_p = this.options) === null || _p === void 0 ? void 0 : _p.paragraph));
        }
        if (this.options.strike !== false) {
            extensions.push(Strike.configure((_q = this.options) === null || _q === void 0 ? void 0 : _q.strike));
        }
        if (this.options.text !== false) {
            extensions.push(Text.configure((_r = this.options) === null || _r === void 0 ? void 0 : _r.text));
        }
        if (this.options.tasklist !== false) {
            extensions.push(TaskList.configure((_s = this.options) === null || _s === void 0 ? void 0 : _s.tasklist));
        }
        if (this.options.taskitem !== false) {
            extensions.push(TaskItem.configure((_t = this.options) === null || _t === void 0 ? void 0 : _t.taskitem));
        }
        if (this.options.link !== false) {
            extensions.push(Link.configure((_u = this.options) === null || _u === void 0 ? void 0 : _u.link));
        }
        if (this.options.placeholder !== false) {
            extensions.push(Placeholder.configure((_v = this.options) === null || _v === void 0 ? void 0 : _v.placeholder));
        }
        if (this.options.text !== false) {
            extensions.push(Text.configure((_w = this.options) === null || _w === void 0 ? void 0 : _w.text));
        }
        return extensions;
    },
});
//# sourceMappingURL=starter-kit.js.map