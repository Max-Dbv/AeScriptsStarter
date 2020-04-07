const layout = "palette { \
    fontPanel: Panel { orientation: 'column',  alignChildren:'left',\
        text: 'Font', \
        fFamily: Group { orientation: 'row', \
            s: StaticText { text:'Font Family:', preferredSize: [75, -1] }, \
            e: StaticText { text:'', preferredSize: [200, -1] } \
        }, \
        fSize: Group { orientation: 'row', \
            s: StaticText { text:'Font Size:', preferredSize: [75, -1] }, \
            e: StaticText { text:'', preferredSize: [200, -1] } \
        } \
    }, \
    layerPanel: Panel { orientation: 'column',  alignChildren:'left',\
        text: 'Actual Layer Size', \
        lWidth: Group { orientation: 'row', \
            s: StaticText { text:'Width:', preferredSize: [75, -1] }, \
            e: StaticText { text:'', preferredSize: [200, -1] } \
        }, \
        lHeight: Group { orientation: 'row', \
            s: StaticText { text:'Height:', preferredSize: [75, -1] }, \
            e: StaticText { text:'', preferredSize: [200, -1] } \
        } \
    }, \
    buttons: Group { orientation: 'row', \
        refreshBtn: Button { text:'Refresh' }, \
    }, \
}"

const errNoTextSelected = 'No text layer details found'

const getFont = (textLayer) => {
    const textDocument = textLayer.property('Source Text').value
    return textDocument.font ? textDocument.font : 'No font found'
}

const getFontSize = (textLayer) => {
    const textDocument = textLayer.property('Source Text').value
    return textDocument.fontSize ? textDocument.fontSize : 'No font size found'
}

const getActualLayerSize = (layer) => {
    const layerScale = layer.property("Scale").value
    const layerBounds = layer.sourceRectAtTime(0, false) 

    return layerScale && layerBounds ? {
        width: layerScale[0] * 0.01 * layerBounds.width,
        height: layerScale[1] * 0.01 * layerBounds.height,
    } : null
}

const selectTextLayer = (comp) => {
    if (comp.selectedLayers && comp.selectedLayers.length > 0) {
        if (comp.selectedLayers[0].matchName == 'ADBE Text Layer') {
            return comp.selectedLayers[0]
        }
    }
    return null
}

const fetchData = () => {
    const currentComp = app.project.activeItem
    const textLayer = selectTextLayer(currentComp)

    gui.fontPanel.fFamily.e.text = textLayer ? getFont(textLayer) : errNoTextSelected
    gui.fontPanel.fSize.e.text =  textLayer ? getFontSize(textLayer) : errNoTextSelected

    const textLayerBounds = textLayer ? getActualLayerSize(textLayer) : null

    gui.layerPanel.lWidth.e.text = textLayer && textLayerBounds ?
        `${Math.round(textLayerBounds.width)} (${textLayerBounds.width})` : errNoTextSelected
    gui.layerPanel.lHeight.e.text = textLayer && textLayerBounds ?
        `${Math.round(textLayerBounds.height)} (${textLayerBounds.height})` : errNoTextSelected
}


gui = new Window(layout)
gui.buttons.refreshBtn.onClick = () => fetchData()

fetchData()

gui.center()
gui.show()
