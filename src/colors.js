import { get } from 'lodash/fp';


const colors = {
    "states": {
        "draft": "#ea9999",
        "openForComment": "#c90076",
        "underReview": "#9cb8d1",
        "approved": "#3d85c6",
        "underConstruction": "#f7e62b",
        "operating": "#2bb120",
        "partiallyConstructed": "#b6d7a8",
        "cancelled": "#bcbcbc",
        "unknown": "#000000"
    }
}

function colorToRGBArray(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

function colorOfStateHex(state) {
    switch (get('key', state)) {
        case "draft":
            return colors.states.draft;
            break;
        case "open-for-comment":
            return colors.states.openForComment;
            break;
        case "under-review":
            return colors.states.underReview;
            break;
        case "approved":
            return colors.states.approved;
            break;
        case "under-construction":
            return colors.states.underConstruction;
            break;
        case "operating":
            return colors.states.operating;
            break;
        case "partially-constructed":
            return colors.states.partiallyConstructed;
            break;
        case "cancelled":
            return colors.states.cancelled;
            break;
        default:
            return colors.states.unknown
    }
}


function colorOfState(state) {
    return colorToRGBArray(colorOfStateHex(state));
}

export { colors, colorToRGBArray, colorOfState, colorOfStateHex };
