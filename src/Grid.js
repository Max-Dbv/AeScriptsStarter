const { _clearLayers } = require('./utils.js')

const currentScript = 'GRID_GENERATION'
const projectWidth = 1920
const projectHeight = 1080

const rowsCount = 30
const colomnsCount = 10

const currentComp = app.project.activeItem

if (currentComp && currentComp.typeName !== 'Composition') {
    console.log('No composition selected.')
} else {
    app.beginUndoGroup(currentScript)

    // Testing : Clear all layers
    if (currentComp.layers && currentComp.layers.length > 0) {
        _clearLayers(currentComp)
    }

    const shapeLayer = currentComp.layers.addShape()
    const circleGroup = shapeLayer.property("Contents").addProperty("ADBE Vector Group");

    const fillGroupWithCircle = (groupToFill, horizontalCount = 10, verticalCount = 10) => {
        let circles = []
        for (i = 0; i < horizontalCount; i++) {
            for (j = 0; j < verticalCount; j++) {
                const curCircle = groupToFill.property("Contents").addProperty("ADBE Vector Shape - Ellipse")

                const posX = (projectWidth / (horizontalCount - 1) ) * i - (projectWidth / 2) 
                const posY = (projectHeight / (verticalCount - 1) ) * j - (projectHeight / 2)

                const sizeX = (Math.abs(posX) / projectWidth) * 500
                const sizeY = (Math.abs(posY) / projectHeight) * 500

                curCircle.property("ADBE Vector Ellipse Position").setValue([posX, posY])
                curCircle.property("ADBE Vector Ellipse Size").setValue([sizeX, sizeY])

                circles.push(curCircle)
            }
        }
        return circles
    }
    
    const circlesArray = fillGroupWithCircle(circleGroup, rowsCount, colomnsCount)

    app.endUndoGroup()
}