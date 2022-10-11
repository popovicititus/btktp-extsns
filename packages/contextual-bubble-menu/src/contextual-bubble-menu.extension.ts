import { Extension } from '@tiptap/core';
import {BubbleMenuPluginProps, ContextualBubbleMenuPlugin} from './contextual-bubble-menu';

export type BubbleMenuOptions = Omit<BubbleMenuPluginProps, 'editor' | 'element'> & {
  element: HTMLElement | null,
};

export const BtmkContextualBubbleMenu = Extension.create<BubbleMenuOptions>({
  name: 'contextualBubbleMenu',

  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: 'bubbleMenu',
      pluginType: '',
      shouldShow: null,
    };
  },

  addProseMirrorPlugins() {
    if (!this.options.element) {
      return [];
    }

    return [
      ContextualBubbleMenuPlugin({
        pluginKey: this.options.pluginKey,
        pluginType: this.options.pluginType,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow,
      }),
    ];
  },
});
