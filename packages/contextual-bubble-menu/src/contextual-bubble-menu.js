import { isTextSelection, } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
export class ContextualBubbleMenuView {
    constructor({ editor, element, view, pluginType, tippyOptions = {}, shouldShow, }) {
        this.preventHide = false;
        this.shouldShow = ({ state, from, to }) => {
            const { doc, selection } = state;
            const { empty } = selection;
            // Sometime check for `empty` is not enough.
            // Doubleclick an empty paragraph returns a node size of 2.
            // So we check also for an empty text size.
            const isEmptyTextBlock = !doc.textBetween(from, to).length
                && isTextSelection(state.selection);
            if (empty || isEmptyTextBlock) {
                return false;
            }
            return true;
        };
        this.mousedownHandler = () => {
            this.preventHide = true;
        };
        this.dragstartHandler = () => {
            this.hide();
        };
        this.focusHandler = () => {
            // we use `setTimeout` to make sure `selection` is already updated
            setTimeout(() => this.update(this.editor.view));
        };
        this.blurHandler = ({ event }) => {
            var _a;
            if (this.preventHide) {
                this.preventHide = false;
                return;
            }
            if ((event === null || event === void 0 ? void 0 : event.relatedTarget)
                && ((_a = this.element.parentNode) === null || _a === void 0 ? void 0 : _a.contains(event.relatedTarget))) {
                return;
            }
            // this.hide();
        };
        this.editor = editor;
        this.element = element;
        this.view = view;
        this.pluginType = pluginType;
        if (shouldShow) {
            this.shouldShow = shouldShow;
        }
        const editorContainer = this.editor.view.docView.dom.parentElement.parentElement;
        if (editorContainer) {
            const el = editorContainer.querySelector('#contextual-menu-absolute-' + this.pluginType);
            el === null || el === void 0 ? void 0 : el.addEventListener('mousedown', this.mousedownHandler, { capture: true });
            this.element.addEventListener('mousedown', this.mousedownHandler, { capture: true });
            this.view.dom.addEventListener('dragstart', this.dragstartHandler);
            this.editor.on('focus', this.focusHandler);
            this.editor.on('blur', this.blurHandler);
            this.tippyOptions = tippyOptions;
            // Detaches menu content from its current parent
            this.element.remove();
            this.element.style.visibility = 'visible';
        }
    }
    update(view, oldState) {
        var _a;
        const { state, composing } = view;
        const { doc, selection } = state;
        const isSame = oldState && oldState.doc.eq(doc) && oldState.selection.eq(selection);
        if (!this.editor.isEditable) {
            return false;
        }
        if (composing || isSame) {
            return;
        }
        const { ranges } = selection;
        const nodeStart = selection.$head.path[2];
        let from = nodeStart;
        const to = nodeStart;
        const shouldShow = (_a = this.shouldShow) === null || _a === void 0 ? void 0 : _a.call(this, {
            editor: this.editor,
            view,
            state,
            oldState,
            from,
            to,
        });
        if (!shouldShow) {
            this.hide();
            return;
        }
        const editorContainer = this.editor.view.docView.dom.parentElement.parentElement;
        if (editorContainer) {
            editorContainer.querySelectorAll('.contextual-menu-absolute').forEach((e) => e.className = e.className.replace(/(\s|^)d-hidden(\s|$)/, '') + ' d-hidden');
            if (this.pluginType === 'image') {
                from -= 1;
            }
            const bigNode = view.nodeDOM(from);
            const el = editorContainer.querySelector('#contextual-menu-absolute-' + this.pluginType);
            let offset = this.pluginType === 'code' || this.pluginType === 'header' ? 12 : 0;
            if (document.querySelector('.reader-note-editor .ProseMirror')) {
                offset = offset - document.querySelector('.reader-note-editor .ProseMirror').scrollTop;
            }
            if (el) {
                el.style.top = bigNode.offsetTop + offset - 20 + 'px';
                el.className = el.className.replace(/(\s|^)d-hidden(\s|$)/, ' ');
                const generalMenu = editorContainer.querySelector('#contextual-menu-general');
                if (generalMenu) {
                    el.className = el.className.replace(/(\s|^)d-hidden(\s|$)/, ' ');
                    generalMenu.style.top = bigNode.offsetTop + offset - 50 + 'px';
                    if (this.editor.view.state.selection.empty || this.editor.isActive('codeBlock')) {
                        generalMenu.style.display = 'none';
                    }
                    else {
                        generalMenu.style.display = 'inline-block';
                    }
                }
                if (this.pluginType === 'header') {
                    const levels = { 'h1': 'Title', 'h2': 'Subtitle', 'h3': 'Subtitle', 'h4': 'Text', 'h5': 'Text', 'p': 'Text' };
                    editorContainer.querySelector('.contextual-menu-header-type').innerText = levels[bigNode.tagName.toLowerCase()];
                }
                if (this.pluginType === 'texts') {
                    const lists = {
                        'normal': 'Text',
                        'note': 'Note',
                        'example': 'Example',
                        'remark': 'Remark',
                        'info': 'Info',
                        'hint': 'Hint',
                        'help': 'Help',
                        'warning': 'Warning',
                        'bug': 'Bug'
                    };
                    Object.keys(lists).forEach((i) => {
                        if (this.editor.isActive('paragraph', { paragraphType: i })) {
                            editorContainer.querySelector('.contextual-menu-text-type').innerText = lists[i];
                        }
                    });
                }
                if (this.pluginType === 'list') {
                    const lists = {
                        'bulletList': 'List',
                        'orderedList': 'Numbered List',
                        'letteredList': 'Letter List',
                        'taskList': 'Task List',
                        'noBulletList': 'No Bullets List'
                    };
                    Object.keys(lists).forEach((i) => {
                        if (this.editor.isActive(i)) {
                            editorContainer.querySelector('.contextual-menu-list-type').innerText = lists[i];
                        }
                    });
                }
                if (this.pluginType === 'quote') {
                    const quotes = {
                        'simple-quote': 'Quote',
                        'scientific-quote': 'Scientific Quote',
                        'historic-quote': 'Historic Quote'
                    };
                    editorContainer.querySelector('.contextual-menu-quote-type').innerText = quotes['simple-quote'];
                    Object.keys(quotes).forEach((i) => {
                        if (this.editor.isActive('blockquote', { quoteType: i })) {
                            editorContainer.querySelector('.contextual-menu-quote-type').innerText = quotes[i];
                        }
                    });
                }
                if (this.pluginType === 'code') {
                    const attrs = this.editor.getAttributes('codeBlock');
                    if (attrs === null || attrs === void 0 ? void 0 : attrs.codeLanguage) {
                        editorContainer.querySelector('.contextual-menu-code-type').innerText = attrs.codeLanguage;
                    }
                }
                this.show();
            }
        }
    }
    show() {
        const el = document.getElementById('contextual-menu-absolute-' + this.pluginType);
        el.className = el.className.replace(/(\s|^)d-hidden(\s|$)/, '');
    }
    hide() {
        const el = document.getElementById('contextual-menu-absolute-' + this.pluginType);
        if (el) {
            el.className = el.className.replace(/(\s|^)d-hidden(\s|$)/, '') + ' d-hidden';
        }
    }
    destroy() {
        var _a;
        (_a = this.tippy) === null || _a === void 0 ? void 0 : _a.destroy();
        this.element.removeEventListener('mousedown', this.mousedownHandler, { capture: true });
        this.view.dom.removeEventListener('dragstart', this.dragstartHandler);
        this.editor.off('focus', this.focusHandler);
        this.editor.off('blur', this.blurHandler);
    }
}
export const ContextualBubbleMenuPlugin = (options) => {
    return new Plugin({
        key: typeof options.pluginKey === 'string'
            ? new PluginKey(options.pluginKey)
            : options.pluginKey,
        view: view => new ContextualBubbleMenuView({ view, ...options }),
    });
};
//# sourceMappingURL=contextual-bubble-menu.js.map