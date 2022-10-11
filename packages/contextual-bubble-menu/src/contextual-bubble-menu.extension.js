import { Extension } from '@tiptap/core';
import { ContextualBubbleMenuPlugin } from './contextual-bubble-menu';
export const BtmkContextualBubbleMenu = Extension.create({
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
//# sourceMappingURL=contextual-bubble-menu.extension.js.map