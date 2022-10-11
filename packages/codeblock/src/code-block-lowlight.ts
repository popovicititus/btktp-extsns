import {lowlight} from 'lowlight/lib/core';
import CodeBlock, {CodeBlockOptions} from '@tiptap/extension-code-block';
import {LowlightPlugin} from './lowlight-plugin';

export interface CodeBlockLowlightOptions extends CodeBlockOptions {
  lowlight: any;
  defaultLanguage: string | null | undefined;
}

export const BtmkCodeBlock = CodeBlock.extend<CodeBlockLowlightOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      lowlight,
      defaultLanguage: null,
    };
  },

  addAttributes() {
    return {
      language: {
        default: 'plaintext'
      },
      codeLanguage: {
        default: 'plaintext'
      }
    };
  },

  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      LowlightPlugin({
        name: this.name,
        lowlight: this.options.lowlight,
        defaultLanguage: this.options.defaultLanguage,
      }),
    ];
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setCodeblockLanguage: (language: any) => ({commands} : any) => {
        return commands.updateAttributes('codeBlock', {
          codeLanguage: language,
          language: language,
          class: 'language-' + language
        });
      },
      toggleCodeblockColoring: () => ({commands} : any) => {
        const attrs = this.editor.getAttributes('codeBlock');
        if (attrs?.language !== 'plaintext') {
          return commands.updateAttributes('codeBlock', {language: 'plaintext', class: 'language-plaintext'});
        } else {
          const lang = attrs?.codeLanguage || 'plaintext';
          return commands.updateAttributes('codeBlock', {language: lang, class: 'language-' + lang});
        }
      }
    };
  },
});
