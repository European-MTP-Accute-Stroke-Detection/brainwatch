/* eslint-disable */

function addLayer() {
  var layerGroup = this.dwvApp.getActiveLayerGroup();
  console.log(layerGroup);

  var drawLayer = layerGroup.getActiveDrawLayer();
  console.log(drawLayer);

  var viewLayer = layerGroup.getActiveViewLayer();
  console.log(drawLayer);

  // Get the current drawController from the DWV app
  const drawController = drawLayer.getDrawController();
  console.log(drawController);

  const viewController = viewLayer.getViewController();

  // define a drawingDetails (an object with metadata for the drawing)
  const drawingDetails = {
    1: {
      meta: {
        type: "rectangle",
        quantification: "1.2 cm x 3.5 cm",
        textExpr: "This is a rectangle with dimensions {quantification}",
      },
    },
  };

  // define the callback function to execute after the command has been executed
  const exeCallback = function (cmd) {
    console.log("Command executed:", cmd);
  };

  // define the callback function to use with the DrawCommand
  const cmdCallback = function (cmd) {
    console.log("DrawCommand executed:", cmd);
  };

  console.log(this.savedLayer);

  const arrowShape = new dwv.tool.draw.ArrowFactory().create(
    [new dwv.math.Point2D(9, 9), new dwv.math.Point2D(49, 49)],
    null,
    drawLayer
  );

  console.log(arrowShape);

  // // call setDrawings() with the arguments
  // drawController.setDrawings(
  //   [this.savedLayer],
  //   [drawingDetails],
  //   cmdCallback,
  //   exeCallback
  // );
}

function createDrawingDetails(id) {
  return {
    id: id,
    position: "(0,0,0)",
    type: "Ruler",
    color: "#ffff80",
    meta: {
      textExpr: "{length}",
      quantification: {
        length: {
          value: 78.17939716184543,
          unit: "mm",
        },
      },
    },
  };
}

function createConvaLayer() {
  // create a rectangle
  var rect = new Konva.Rect({
    x: 20,
    y: 20,
    width: 100,
    height: 50,
    fill: "red",
  });

  // create a shape group and add the rectangle to it
  var shapeGroup = new Konva.Group({
    name: "shape-group",
    id: "187",
    opacity: 1,
    visible: true,
  });

  shapeGroup.add(rect);

  // create a new layer
  var layer = new Konva.Layer();

  // add the position group to the layer
  layer.add(shapeGroup);

  // serialize the layer to JSON
  return layer;
}

/**
 * Handle a change draw shape event.
 * @param shape The new shape name.
 */
onChangeShape = (shape) => {
  if (this.dwvApp && this.selectedTool === "Draw") {
    this.dwvApp.setToolFeatures({ shapeName: shape });
  }

  var layerGroup = this.dwvApp.getActiveLayerGroup();
  console.log(layerGroup);

  var drawLayer = layerGroup.getActiveDrawLayer();
  console.log(drawLayer);

  // Get the current drawController from the DWV app
  const drawController = drawLayer.getDrawController();
  console.log(drawController);

  const drawDisplayDetails = drawController.getDrawDisplayDetails();
  console.log(drawDisplayDetails);

  const drawStoreDetails = drawController.getDrawStoreDetails();
  console.log(drawStoreDetails);

  const convaGroup = drawController.getGroup(drawDisplayDetails[0].id);
  console.log(convaGroup);

  const myConvaLayer = this.createConvaLayer();
  console.log(myConvaLayer);
  this.savedLayer = myConvaLayer;

  const myDrawingDetails = this.createDrawingDetails("187");
  console.log(myDrawingDetails);

  // create a new Konva rect
  var rect = new Konva.Rect({
    x: 20,
    y: 20,
    width: 100,
    height: 50,
    fill: "red",
  });

  // add the rect to a layer
  var layer = new Konva.Layer();
  layer.add(rect);

  // create a JSON string from the layer
  var serializedLayer = JSON.stringify(layer.toJSON());
};
