

const lgaLabel = (key) => {
    switch (key) {
        case "tfnsw":
            return "TfNSW"
            break;
        case "inner-west":
            return "Inner West"
            break;
        case "city-of-sydney":
            return "City of Sydney";
            break;
        case "waverley":
            return "Waverley";
            break;
        case "randwick":
            return "Randwick";
            break;
        case "woollahra":
            return "Woollahra";
            break;
        case "north-sydney":
            return "North Sydney";
            break;
        case "lane-cove":
            return "Lane Cove";
            break;
        case "canterbury-bankstown":
            return "Canterbury-Bankstown";
            break;
        case "strathfield":
            return "Strathfield";
            break;
        case "burwood":
            return "Burwood";
            break;
        case "canada-bay":
            return "Canada Bay";
            break;
        case "ryde":
            return "Ryde";
            break;
        case "northern-beaches":
            return "Northern Beaches";
            break;
        case "bayside":
            return "Bayside";
            break;
        case "georges-river":
            return "Georges River";
            break;
        case "liverpool":
            return "Liverpool";
            break;
        case "campbelltown":
            return "Campbelltown";
            break;
        case "camden":
            return "Camden";
            break;
        case "penrith":
            return "Penrith";
            break;
        case "fairfield":
            return "Fairfield";
            break;
        case "blacktown":
            return "Blacktown";
            break;
        case "cumberland":
            return "Cumberland";
            break;
        case "parramatta":
            return "Parramatta";
            break;
        default:
            return key
    }
};

const tagLabel = (key) => {
    switch (key) {
        case "separated-cycleway":
            return "Separated cycleway";
            break;
        case "mixed-traffic":
            return "Mixed traffic";
            break;
        case "offroad":
            return "Offroad";
            break;
        case "shared-path":
            return "Shared path";
            break;
        case "unprotected-cycle-lane":
            return "Unprotected cycle lane";
            break;
        case "separated-cycleway-removal":
            return "Separated cycleway removal";
            break;
        default:
            return key
    }
}

const stateLabel = (key) => {
    switch (key) {
        case "draft":
            return "Draft";
            break;
        case "open-for-comment":
            return "Open for comment";
            break;
        case "under-review":
            return "Under review";
            break;
        case "approved":
            return "Approved";
            break;
        case "under-construction":
            return "Under construction";
            break;
        case "partially-constructed":
            return "Partially constructed";
            break;
        case "operating":
            return "Operating";
            break;
        case "cancelled":
            return "Cancelled";
            break;
        default:
            return key;
    }
}

export { lgaLabel, tagLabel, stateLabel };
