import { Mark, mergeAttributes } from '@tiptap/core';
export const Highlight = Mark.create({
    name: 'highlight',
    addOptions() {
        return {
            HTMLAttributes: {
                style: 'background-color: yellow'
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'mark',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    }
});
//# sourceMappingURL=highlight.js.map