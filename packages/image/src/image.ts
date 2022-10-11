import Image, {ImageOptions} from '@tiptap/extension-image';

export interface BitmarkImageOptions extends ImageOptions {
  height: any;
  width: any;
}

const BitmarkImage = Image.extend<BitmarkImageOptions>({
  inline: false,
  group: 'block',
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'center',
      },
      height: {
        default: null
      },
      width: {
        default: null
      }
    };
  },
  addCommands() {
    return {
      ...this.parent?.(),
      setImageAlignmentClass: (alignment: any) => ({commands} : any) => {
        return commands.updateAttributes('image', {
          class: alignment,
          height: this.options.height,
          width: this.options.width,
        });
      },
    };
  },
});

export default BitmarkImage;
