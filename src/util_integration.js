/*global CSL: true */


CSL.Engine.prototype.setCitationId = function (citation, force) {
    var ret, id, direction;
    ret = false;
    if (!citation.citationID || force) {
        id = Math.floor(Math.random() * 100000000000000);
        while (true) {
            direction = 0;
            if (!this.registry.citationreg.citationById[id]) {
                citation.citationID = id.toString(32);
                break;
            } else if (!direction && id < 50000000000000) {
                direction = 1;
            } else {
                direction = -1;
            }
            if (direction === 1) {
                id += 1;
            } else {
                id += -1;
            }
        }
        ret = "" + id;
    }
    this.registry.citationreg.citationById[citation.citationID] = citation;
    return ret;
};
