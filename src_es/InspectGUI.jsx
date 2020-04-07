"use strict";

var layout = "palette { \
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
}";
var errNoTextSelected = 'No text layer details found';

var getFont = function getFont(textLayer) {
  var textDocument = textLayer.property('Source Text').value;
  return textDocument.font ? textDocument.font : 'No font found';
};

var getFontSize = function getFontSize(textLayer) {
  var textDocument = textLayer.property('Source Text').value;
  return textDocument.fontSize ? textDocument.fontSize : 'No font size found';
};

var getActualLayerSize = function getActualLayerSize(layer) {
  var layerScale = layer.scale.value;
  var layerBounds = layer.sourceRectAtTime(app.project.activeItem.time, false);
  return layerScale && layerBounds ? {
    width: layerScale[0] * 0.01 * layerBounds.width,
    height: layerScale[1] * 0.01 * layerBounds.height
  } : null;
};

var selectTextLayer = function selectTextLayer(comp) {
  if (comp.selectedLayers && comp.selectedLayers.length > 0) {
    if (comp.selectedLayers[0].matchName == 'ADBE Text Layer') {
      return comp.selectedLayers[0];
    }
  }

  return null;
};

var fetchData = function fetchData() {
  var currentComp = app.project.activeItem;
  var textLayer = selectTextLayer(currentComp);
  gui.fontPanel.fFamily.e.text = textLayer ? getFont(textLayer) : errNoTextSelected;
  gui.fontPanel.fSize.e.text = textLayer ? getFontSize(textLayer) : errNoTextSelected;
  var textLayerBounds = textLayer ? getActualLayerSize(textLayer) : null;
  gui.layerPanel.lWidth.e.text = textLayerBounds ? "".concat(Math.round(textLayerBounds.width), " (").concat(textLayerBounds.width, ")") : errNoTextSelected;
  gui.layerPanel.lHeight.e.text = textLayerBounds ? "".concat(Math.round(textLayerBounds.height), " (").concat(textLayerBounds.height, ")") : errNoTextSelected;
};

gui = new Window(layout);

gui.buttons.refreshBtn.onClick = function () {
  return fetchData();
};

fetchData();
gui.center();
gui.show();