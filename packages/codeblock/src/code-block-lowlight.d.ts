import { CodeBlockOptions } from '@tiptap/extension-code-block';
export interface CodeBlockLowlightOptions extends CodeBlockOptions {
    lowlight: any;
    defaultLanguage: string | null | undefined;
}
export declare const BtmkCodeBlock: import("@tiptap/core").Node<CodeBlockLowlightOptions, any>;
