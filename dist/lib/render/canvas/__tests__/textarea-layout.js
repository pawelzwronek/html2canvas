"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var textarea_layout_1 = require("../textarea-layout");
var css_line_break_1 = require("css-line-break");
describe('textarea-layout', function () {
    it('should wrap lines at word boundaries', function () {
        layoutEqual(' A long text with several lines.', [' A long text', 'with several', 'lines.']);
    });
    it('should omit spaces at the end of a line', function () {
        layoutEqual(' A long text     with several lines.  2', [' A long text', 'with several', 'lines.  2']);
    });
    it('should omit spaces at the end of a line 2', function () {
        layoutEqual('  A long text   with several lines.  2', ['  A long', 'text   with', 'several', 'lines.  2']);
    });
    it('should omit spaces at the end of a line 3', function () {
        layoutEqual('A long text     with   sev      eral lines.', ['A long text', 'with   sev', 'eral lines.']);
    });
    it('should respect newlines', function () {
        layoutEqual(' A long text\n    with\n\n several lines.', [' A long text', '    with', '', ' several', 'lines.']);
    });
    it('should wrap too long words', function () {
        layoutEqual('Donaudampfschifffahrtskapitänskoch 2', ['Donaudampfsc', 'hifffahrtska', 'pitänskoch 2']);
    });
    it('should wrap too long words 2', function () {
        layoutEqual('Donaudampfschifffahrtskapitänskoch\n 2', ['Donaudampfsc', 'hifffahrtska', 'pitänskoch', ' 2']);
    });
    it('should wrap too long words 3', function () {
        layoutEqual('Donaudampfsc x2', ['Donaudampfsc', 'x2']);
    });
    it('should wrap lines at -', function () {
        layoutEqual('   Long text- message with lines.', ['   Long text', '- message', 'with lines.']);
    });
    it('should wrap lines at - 2', function () {
        layoutEqual('Long text-  message with sev lines.', ['Long text- ', 'message with', 'sev lines.']);
    });
    it('should wrap lines at - 3', function () {
        layoutEqual('Long text-message with sev lines.', ['Long text-', 'message with', 'sev lines.']);
    });
});
function layoutEqual(s, lines) {
    var pos = textarea_layout_1.layout(css_line_break_1.toCodePoints(s).map(function (i) { return css_line_break_1.fromCodePoint(i); }), 120, function (_, len) { return 10 * len; });
    var line = '';
    var y = 0;
    var j = 0;
    for (var i = 0; i < pos.length; i++) {
        if (y === pos[i][1]) {
            if (pos[i][0] >= 0) {
                line += s.charAt(i);
            }
        }
        else {
            assert_1.strictEqual(line, lines[j]);
            j++;
            line = pos[i][0] >= 0 ? s.charAt(i) : '';
            y = pos[i][1];
        }
    }
}
//# sourceMappingURL=textarea-layout.js.map