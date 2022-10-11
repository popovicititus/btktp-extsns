import { ImageOptions } from '@tiptap/extension-image';
export interface BitmarkImageOptions extends ImageOptions {
    height: any;
    width: any;
}
declare const BitmarkImage: import("@tiptap/core").Node<BitmarkImageOptions, any>;
export default BitmarkImage;
