var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
var PlaceholderImage = function (_a) {
    var width = _a.width, height = _a.height, text = _a.text, _b = _a.color, color = _b === void 0 ? '#f0f0f0' : _b;
    return (_jsx("div", __assign({ style: {
            width: width,
            height: height,
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#666',
            border: '1px solid #ddd',
        } }, { children: text })));
};
export default PlaceholderImage;
