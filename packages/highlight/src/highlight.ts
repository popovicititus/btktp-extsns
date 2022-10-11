import {Mark, mergeAttributes} from '@tiptap/core';

export interface MarkedOptions {
  HTMLAttributes: Record<string, any>;
}

export const Highlight = Mark.create<MarkedOptions>({
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
