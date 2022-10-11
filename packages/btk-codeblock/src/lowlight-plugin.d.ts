import { Plugin } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
export declare function LowlightPlugin({ name, lowlight, defaultLanguage }: {
    name: string;
    lowlight: any;
    defaultLanguage: string | null | undefined;
}): Plugin<DecorationSet>;
