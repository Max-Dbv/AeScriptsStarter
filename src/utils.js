function _clearLayers(comp) {
    const layersLength = comp.layers && comp.layers.length
    for (var i = 1; i < layersLength + 1; i++) {
        comp.layers[1].remove()
    }
}

module.exports = {
    _clearLayers
}