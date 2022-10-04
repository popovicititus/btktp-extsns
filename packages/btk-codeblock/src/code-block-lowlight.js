import { lowlight } from 'lowlight/lib/core';
import CodeBlock from '@tiptap/extension-code-block';
import { LowlightPlugin } from './lowlight-plugin';
export const BtmkCodeBlock = CodeBlock.extend({
    addOptions() {
        var _a;
        return {
            ...(_a = this.parent) === null || _a === void 0 ? void 0 : _a.call(this),
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
        var _a;
        return [
            ...((_a = this.parent) === null || _a === void 0 ? void 0 : _a.call(this)) || [],
            LowlightPlugin({
                name: this.name,
                lowlight: this.options.lowlight,
                defaultLanguage: this.options.defaultLanguage,
            }),
        ];
    },
    addCommands() {
        var _a;
        return {
            ...(_a = this.parent) === null || _a === void 0 ? void 0 : _a.call(this),
            setCodeblockLanguage: (language) => ({ commands }) => {
                return commands.updateAttributes('codeBlock', {
                    codeLanguage: language,
                    language: language,
                    class: 'language-' + language
                });
            },
            toggleCodeblockColoring: () => ({ commands }) => {
                const attrs = this.editor.getAttributes('codeBlock');
                if ((attrs === null || attrs === void 0 ? void 0 : attrs.language) !== 'plaintext') {
                    return commands.updateAttributes('codeBlock', { language: 'plaintext', class: 'language-plaintext' });
                }
                else {
                    const lang = (attrs === null || attrs === void 0 ? void 0 : attrs.codeLanguage) || 'plaintext';
                    return commands.updateAttributes('codeBlock', { language: lang, class: 'language-' + lang });
                }
            }
        };
    },
});
//# sourceMappingURL=code-block-lowlight.js.map