import Image from '@tiptap/extension-image';
const BitmarkImage = Image.extend({
    inline: false,
    group: 'block',
    addAttributes() {
        var _a;
        return {
            ...(_a = this.parent) === null || _a === void 0 ? void 0 : _a.call(this),
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
        var _a;
        return {
            ...(_a = this.parent) === null || _a === void 0 ? void 0 : _a.call(this),
            setImageAlignmentClass: (alignment) => ({ commands }) => {
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
//# sourceMappingURL=image.js.map