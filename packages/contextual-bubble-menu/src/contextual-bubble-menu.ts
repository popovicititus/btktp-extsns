import {
  Editor,
  isTextSelection,
} from '@tiptap/core';
import {EditorState, Plugin, PluginKey} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {Instance, Props} from 'tippy.js';

export interface BubbleMenuPluginProps {
  pluginKey: PluginKey | string;
  pluginType: string;
  editor: Editor;
  element: HTMLElement;
  tippyOptions?: Partial<Props>;
  shouldShow?: ((props: {
    editor: Editor,
    view: EditorView,
    state: EditorState,
    oldState?: EditorState,
    from: number,
    to: number,
  }) => boolean) | null;
}

export type BubbleMenuViewProps = BubbleMenuPluginProps & {
  view: EditorView,
};

export class ContextualBubbleMenuView {
  public editor: Editor;

  public pluginType: string;

  public element: HTMLElement;

  public view: EditorView;

  public preventHide = false;

  public tippy: Instance | undefined;

  public tippyOptions?: Partial<Props>;

  public shouldShow: Exclude<BubbleMenuPluginProps['shouldShow'], null> = ({state, from, to}) => {
    const {doc, selection} = state;
    const {empty} = selection;

    // Sometime check for `empty` is not enough.
    // Doubleclick an empty paragraph returns a node size of 2.
    // So we check also for an empty text size.
    const isEmptyTextBlock = !doc.textBetween(from, to).length
      && isTextSelection(state.selection);

    if (empty || isEmptyTextBlock) {
      return false;
    }

    return true;
  }

  constructor({
                editor,
                element,
                view,
                pluginType,
                tippyOptions = {},
                shouldShow,
              }: BubbleMenuViewProps) {
    this.editor = editor;
    this.element = element;
    this.view = view;
    this.pluginType = pluginType;

    if (shouldShow) {
      this.shouldShow = shouldShow;
    }

    const editorContainer = (this.editor.view as any).docView.dom.parentElement.parentElement;
    if (editorContainer) {
      const el = editorContainer.querySelector('#contextual-menu-absolute-' + this.pluginType);
      el?.addEventListener('mousedown', this.mousedownHandler, {capture: true});
      this.element.addEventListener('mousedown', this.mousedownHandler, {capture: true});
      this.view.dom.addEventListener('dragstart', this.dragstartHandler);
      this.editor.on('focus', this.focusHandler);
      this.editor.on('blur', this.blurHandler);
      this.tippyOptions = tippyOptions;
      // Detaches menu content from its current parent
      this.element.remove();
      this.element.style.visibility = 'visible';
    }
  }

  mousedownHandler = () => {
    this.preventHide = true;
  }

  dragstartHandler = () => {
    this.hide();
  }

  focusHandler = () => {
    // we use `setTimeout` to make sure `selection` is already updated
    setTimeout(() => this.update(this.editor.view));
  }

  blurHandler = ({event}: { event: FocusEvent }) => {
    if (this.preventHide) {
      this.preventHide = false;

      return;
    }

    if (
      event?.relatedTarget
      && this.element.parentNode?.contains(event.relatedTarget as Node)
    ) {
      return;
    }

    // this.hide();
  }

  update(view: EditorView, oldState?: EditorState) {
    const {state, composing} = view;
    const {doc, selection} = state;
    const isSame = oldState && oldState.doc.eq(doc) && oldState.selection.eq(selection);

    if (!this.editor.isEditable) {
      return false;
    }

    if (composing || isSame) {
      return;
    }

    const {ranges} = selection;
    const nodeStart = (selection.$head as any).path[2];

    let from = nodeStart;
    const to = nodeStart;

    const shouldShow = this.shouldShow?.({
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
    const editorContainer = (this.editor.view as any).docView.dom.parentElement.parentElement;
    if (editorContainer) {
      editorContainer.querySelectorAll('.contextual-menu-absolute').forEach((e: any) => e.className = e.className.replace(/(\s|^)d-hidden(\s|$)/, '') + ' d-hidden');
      if (this.pluginType === 'image') {
        from -= 1;
      }
      const bigNode = view.nodeDOM(from) as HTMLElement;
      const el = editorContainer.querySelector('#contextual-menu-absolute-' + this.pluginType);
      let offset = this.pluginType === 'code' || this.pluginType === 'header' ? 12 : 0;
      if (document.querySelector('.reader-note-editor .ProseMirror')) {
        offset = offset - document.querySelector('.reader-note-editor .ProseMirror')!.scrollTop;
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
          } else {
            generalMenu.style.display = 'inline-block';
          }
        }
        if (this.pluginType === 'header') {
          const levels: any = {'h1': 'Title', 'h2': 'Subtitle', 'h3': 'Subtitle', 'h4': 'Text', 'h5': 'Text', 'p': 'Text'};
          editorContainer.querySelector('.contextual-menu-header-type').innerText = levels[bigNode.tagName.toLowerCase()];
        }
        if (this.pluginType === 'texts') {
          const lists: any = {
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
            if (this.editor.isActive('paragraph', {paragraphType: i})) {
              editorContainer.querySelector('.contextual-menu-text-type').innerText = lists[i];
            }
          });
        }
        if (this.pluginType === 'list') {
          const lists: any = {
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
          const quotes: any = {
            'simple-quote': 'Quote',
            'scientific-quote': 'Scientific Quote',
            'historic-quote': 'Historic Quote'
          };
          editorContainer.querySelector('.contextual-menu-quote-type').innerText = quotes['simple-quote'];
          Object.keys(quotes).forEach((i) => {
            if (this.editor.isActive('blockquote', {quoteType: i})) {
              editorContainer.querySelector('.contextual-menu-quote-type').innerText = quotes[i];
            }
          });
        }
        if (this.pluginType === 'code') {
          const attrs = this.editor.getAttributes('codeBlock');
          if (attrs?.codeLanguage) {
            editorContainer.querySelector('.contextual-menu-code-type').innerText = attrs.codeLanguage;
          }
        }
        this.show();
      }
    }
  }

  show() {
    const el = document.getElementById('contextual-menu-absolute-' + this.pluginType)!;
    el.className = el.className.replace(/(\s|^)d-hidden(\s|$)/, '');
  }

  hide() {
    const el = document.getElementById('contextual-menu-absolute-' + this.pluginType);
    if (el) {
      el.className = el.className.replace(/(\s|^)d-hidden(\s|$)/, '') + ' d-hidden';
    }
  }

  destroy() {
    this.tippy?.destroy();
    this.element.removeEventListener('mousedown', this.mousedownHandler, {capture: true});
    this.view.dom.removeEventListener('dragstart', this.dragstartHandler);
    this.editor.off('focus', this.focusHandler);
    this.editor.off('blur', this.blurHandler);
  }
}

export const ContextualBubbleMenuPlugin = (options: BubbleMenuPluginProps) => {
  return new Plugin({
    key: typeof options.pluginKey === 'string'
      ? new PluginKey(options.pluginKey)
      : options.pluginKey,
    view: view => new ContextualBubbleMenuView({view, ...options}),
  });
};
