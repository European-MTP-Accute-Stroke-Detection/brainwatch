import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { VERSION } from '@angular/core';
import * as dwv from 'dwv';
import Konva from 'konva';
import { MatDialog } from '@angular/material/dialog';
import { TagsDialogComponent } from './components/tags-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { Scan } from '../model/scan';

// gui overrides

// Image decoders (for web workers)
dwv.image.decoderScripts = {
  jpeg2000: 'assets/dwv/decoders/pdfjs/decode-jpeg2000.js',
  'jpeg-lossless': 'assets/dwv/decoders/rii-mango/decode-jpegloss.js',
  'jpeg-baseline': 'assets/dwv/decoders/pdfjs/decode-jpegbaseline.js',
  rle: 'assets/dwv/decoders/dwv/decode-rle.js'
};

@Component({
  selector: 'app-dwv',
  templateUrl: './dwv.component.html',
  styleUrls: ['./dwv.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DwvComponent implements OnInit {

  @Input('scans$') scans$: BehaviorSubject<Scan[]>;

  constructor(
    public dialog: MatDialog,
  ) {
    this.versions = {
      dwv: dwv.getVersion(),
      angular: VERSION.full
    };
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  modelRunning: boolean = false;

  public versions: any;
  public tools = {
    Scroll: {},
    ZoomAndPan: {},
    WindowLevel: {},
    Draw: {
      options: ['Ruler']
    }
  };
  public toolNames: string[] = Object.keys(this.tools);
  public selectedTool = 'Select Tool';
  public loadProgress = 0;
  public dataLoaded = false;

  private dwvApp: any;


  private metaData: any[];

  private orientation: string;

  opened = false;

  savedLayer: any;

  ngOnInit() {

    this.dwvApp = new dwv.App();
    // initialise app
    this.dwvApp.init({
      dataViewConfigs: { '*': [{ divId: 'layerGroup0' }] },
      tools: this.tools,
    });
    // File downloads
    this.scans$.subscribe(scans => {
      if (scans) {
        this.dwvApp.loadURLs(
          scans.map(scan => scan.downloadUrl)
        );

      }
    });
    // handle load events
    let nLoadItem = null;
    let nReceivedLoadError = null;
    let nReceivedLoadAbort = null;
    let isFirstRender = null;
    this.dwvApp.addEventListener('loadstart', (/*event*/) => {
      // reset flags
      this.dataLoaded = false;
      nLoadItem = 0;
      nReceivedLoadError = 0;
      nReceivedLoadAbort = 0;
      isFirstRender = true;
    });
    this.dwvApp.addEventListener('loadprogress', (event) => {
      this.loadProgress = event.loaded;
    });
    this.dwvApp.addEventListener('renderend', (event) => {
      if (isFirstRender) {
        isFirstRender = false;
        // available tools
        let selectedTool = 'ZoomAndPan';
        if (this.dwvApp.canScroll()) {
          selectedTool = 'Scroll';
        }
        this.onChangeTool(selectedTool);
      }
    });
    this.dwvApp.addEventListener('load', (/*event*/) => {
      // set dicom tags
      this.metaData = dwv.utils.objectToArray(this.dwvApp.getMetaData(0));
      // set data loaded flag
      this.dataLoaded = true;
    });
    this.dwvApp.addEventListener('loadend', (/*event*/) => {
      if (nReceivedLoadError) {
        this.loadProgress = 0;
        alert('Received errors during load. Check log for details.');
      }
      if (nReceivedLoadAbort) {
        this.loadProgress = 0;
        alert('Load was aborted.');
      };
      const state = new dwv.io.State();
      const stateJson = state.toJSON(this.dwvApp);
      console.log(stateJson);
      console.log(state);
    });
    this.dwvApp.addEventListener('loaditem', (/*event*/) => {
      ++nLoadItem;
    });
    this.dwvApp.addEventListener('loaderror', (event) => {
      console.error(event.error);
      ++nReceivedLoadError;
    });
    this.dwvApp.addEventListener('loadabort', (/*event*/) => {
      ++nReceivedLoadAbort;
    });

    // handle key events
    this.dwvApp.addEventListener('keydown', (event) => {
      this.dwvApp.defaultOnKeydown(event);
    });
    // handle window resize
    window.addEventListener('resize', this.dwvApp.onResize);
  }

  readState() {
    const state = new dwv.io.State();
    const stateJson = state.toJSON(this.dwvApp);
    console.log(stateJson);
  }

  createAnnotation(centerX, centerY, radius) {

    var layerGroup = this.dwvApp.getLayerGroupByDivId('layerGroup0');

    // get active draw layer
    var drawLayer = layerGroup.addDrawLayer();

    // Create a Point2D object for the center of the circle
    const center = new dwv.math.Point2D(centerX, centerY);

    // Create a Circle object with the specified center and radius
    const circle = new dwv.math.Circle(center, radius);

    // Get the current drawController from the DWV app
    const drawController = drawLayer.getDrawController();

    // Add the circle annotation to the drawController
    drawController.addShape(circle);
  }

  /**
   * Get the icon of a tool.
   *
   * @param tool The tool name.
   * @returns The associated icon string.
   */
  getToolIcon = (tool: string) => {
    let res: string;
    if (tool === 'Scroll') {
      res = 'menu';
    } else if (tool === 'ZoomAndPan') {
      res = 'search';
    } else if (tool === 'WindowLevel') {
      res = 'contrast';
    } else if (tool === 'Draw') {
      res = 'straighten';
    }
    return res;
  }

  /**
   * Handle a change tool event.
   * @param tool The new tool name.
   */
  onChangeTool = (tool: string) => {
    if (this.dwvApp) {
      this.selectedTool = tool;
      this.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.onChangeShape(this.tools.Draw.options[0]);
      }
    }
  }

  /**
   * Check if a tool can be run.
   *
   * @param tool The tool name.
   * @returns True if the tool can be run.
   */
  canRunTool = (tool: string) => {
    let res: boolean;
    if (tool === 'Scroll') {
      res = this.dwvApp.canScroll();
    } else if (tool === 'WindowLevel') {
      res = this.dwvApp.canWindowLevel();
    } else {
      res = true;
    }
    return res;
  }

  /**
   * For toogle button to not get selected.
   *
   * @param event The toogle change.
   */
  onSingleToogleChange = (event) => {
    // unset value -> do not select button
    event.source.buttonToggleGroup.value = '';
  }

  /**
   * Toogle the viewer orientation.
   */
  toggleOrientation = () => {
    if (typeof this.orientation !== 'undefined') {
      if (this.orientation === 'axial') {
        this.orientation = 'coronal';
      } else if (this.orientation === 'coronal') {
        this.orientation = 'sagittal';
      } else if (this.orientation === 'sagittal') {
        this.orientation = 'axial';
      }
    } else {
      // default is most probably axial
      this.orientation = 'coronal';
    }
    // update data view config
    const config = {
      '*': [
        {
          divId: 'layerGroup0',
          orientation: this.orientation
        }
      ]
    };
    this.dwvApp.setDataViewConfig(config);
    // render data
    for (let i = 0; i < this.dwvApp.getNumberOfLoadedData(); ++i) {
      this.dwvApp.render(i);
    }
  }

  /**
   * Handle a change draw shape event.
   * @param shape The new shape name.
   */
  private onChangeShape = (shape: string) => {
    if (this.dwvApp && this.selectedTool === 'Draw') {
      this.dwvApp.setToolFeatures({ shapeName: shape });
    }

    var layerGroup = this.dwvApp.getActiveLayerGroup();
    console.log(layerGroup);

    var drawLayer = layerGroup.getActiveDrawLayer()
    console.log(drawLayer);

    // Get the current drawController from the DWV app
    const drawController = drawLayer.getDrawController();
    console.log(drawController);

    const drawDisplayDetails = drawController.getDrawDisplayDetails();
    console.log(drawDisplayDetails);

    const drawStoreDetails = drawController.getDrawStoreDetails();
    console.log(drawStoreDetails);

    const convaGroup = drawController.getGroup(drawDisplayDetails[0].id);
    console.log(convaGroup)

    const myConvaLayer = this.createConvaLayer();
    console.log(myConvaLayer);
    this.savedLayer = myConvaLayer;

    const myDrawingDetails = this.createDrawingDetails('187');
    console.log(myDrawingDetails);

    // create a new Konva rect
    var rect = new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 50,
      fill: 'red'
    });

    // add the rect to a layer
    var layer = new Konva.Layer();
    layer.add(rect);

    // create a JSON string from the layer
    var serializedLayer = JSON.stringify(layer.toJSON());

  }

  addLayer() {
    var layerGroup = this.dwvApp.getActiveLayerGroup();
    console.log(layerGroup);

    var drawLayer = layerGroup.getActiveDrawLayer()
    console.log(drawLayer);

    var viewLayer = layerGroup.getActiveViewLayer()
    console.log(drawLayer);

    // Get the current drawController from the DWV app
    const drawController = drawLayer.getDrawController();
    console.log(drawController);

    const viewController = viewLayer.getViewController();

    // define a drawingDetails (an object with metadata for the drawing)
    const drawingDetails = {
      "1": {
        "meta": {
          "type": "rectangle",
          "quantification": "1.2 cm x 3.5 cm",
          "textExpr": "This is a rectangle with dimensions {quantification}"
        }
      }
    };

    // define the callback function to execute after the command has been executed
    const exeCallback = function (cmd) {
      console.log('Command executed:', cmd);
    };

    // define the callback function to use with the DrawCommand
    const cmdCallback = function (cmd) {
      console.log('DrawCommand executed:', cmd);
    };

    console.log(this.savedLayer);

    const arrowShape = new dwv.tool.draw.ArrowFactory().create(
      [new dwv.math.Point2D(9, 9), new dwv.math.Point2D(49, 49)],
      null,
      drawLayer
    )

    console.log(arrowShape);

    // // call setDrawings() with the arguments
    // drawController.setDrawings(
    //   [this.savedLayer],
    //   [drawingDetails],
    //   cmdCallback,
    //   exeCallback
    // );
  }

  createDrawingDetails(id: string) {
    return {
      "id": id,
      "position": "(0,0,0)",
      "type": "Ruler",
      "color": "#ffff80",
      "meta": {
        "textExpr": "{length}",
        "quantification": {
          "length": {
            "value": 78.17939716184543,
            "unit": "mm"
          }
        }
      }
    };
  }

  createConvaLayer() {
    // create a rectangle
    var rect = new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 50,
      fill: 'red',
    });

    // create a shape group and add the rectangle to it
    var shapeGroup = new Konva.Group({
      name: 'shape-group',
      id: '187',
      opacity: 1,
      visible: true
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
   * Handle a reset event.
   */
  onReset = () => {
    if (this.dwvApp) {
      this.dwvApp.resetDisplay();
    }
  }

  /**
   * Open the DICOM tags dialog.
   */
  openTagsDialog = () => {
    this.dialog.open(TagsDialogComponent,
      {
        width: '80%',
        height: '90%',
        data: {
          title: 'DICOM Tags',
          value: this.metaData
        }
      }
    );
  }

  // drag and drop [begin] -----------------------------------------------------

  /**
   * Setup the data load drop box: add event listeners and set initial size.
   */
  // private setupDropbox = () => {
  //   this.showDropbox(true);
  // }

  // /**
  //  * Default drag event handling.
  //  * @param event The event to handle.
  //  */
  // private defaultHandleDragEvent = (event: DragEvent) => {
  //   // prevent default handling
  //   event.stopPropagation();
  //   event.preventDefault();
  // }

  // /**
  //  * Handle a drag over.
  //  * @param event The event to handle.
  //  */
  // private onBoxDragOver = (event: DragEvent) => {
  //   this.defaultHandleDragEvent(event);
  //   // update box border
  //   const box = document.getElementById(this.dropboxDivId);
  //   if (box && box.className.indexOf(this.hoverClassName) === -1) {
  //     box.className += ' ' + this.hoverClassName;
  //   }
  // }

  // /**
  //  * Handle a drag leave.
  //  * @param event The event to handle.
  //  */
  // private onBoxDragLeave = (event: DragEvent) => {
  //   this.defaultHandleDragEvent(event);
  //   // update box border
  //   const box = document.getElementById(this.dropboxDivId);
  //   if (box && box.className.indexOf(this.hoverClassName) !== -1) {
  //     box.className = box.className.replace(' ' + this.hoverClassName, '');
  //   }
  // }

  // /**
  //  * Handle a drop event.
  //  * @param event The event to handle.
  //  */
  // private onDrop = (event: DragEvent) => {
  //   this.defaultHandleDragEvent(event);
  //   // load files
  //   this.fileService.selectedFiles = event.dataTransfer.files;
  //   this.dwvApp.loadFiles(event.dataTransfer.files);
  // }

  // /**
  //  * Show/hide the data load drop box.
  //  * @param show True to show the drop box.
  //  */
  // private showDropbox = (show: boolean) => {
  //   const box = document.getElementById(this.dropboxDivId);
  //   if (!box) {
  //     return;
  //   }
  //   const layerDiv = document.getElementById('layerGroup0');

  //   if (show) {
  //     // reset css class
  //     box.className = this.dropboxClassName + ' ' + this.borderClassName;
  //     // check content
  //     if (box.innerHTML === '') {
  //       const p = document.createElement('p');
  //       p.appendChild(document.createTextNode('Drag and drop data here'));
  //       box.appendChild(p);
  //     }
  //     // show box
  //     box.setAttribute('style', 'display:initial');
  //     // stop layer listening
  //     if (layerDiv) {
  //       layerDiv.removeEventListener('dragover', this.defaultHandleDragEvent);
  //       layerDiv.removeEventListener('dragleave', this.defaultHandleDragEvent);
  //       layerDiv.removeEventListener('drop', this.onDrop);
  //     }
  //     // listen to box events
  //     box.addEventListener('dragover', this.onBoxDragOver);
  //     box.addEventListener('dragleave', this.onBoxDragLeave);
  //     box.addEventListener('drop', this.onDrop);
  //   } else {
  //     // remove border css class
  //     box.className = this.dropboxClassName;
  //     // remove content
  //     box.innerHTML = '';
  //     // hide box
  //     box.setAttribute('style', 'display:none');
  //     // stop box listening
  //     box.removeEventListener('dragover', this.onBoxDragOver);
  //     box.removeEventListener('dragleave', this.onBoxDragLeave);
  //     box.removeEventListener('drop', this.onDrop);
  //     // listen to layer events
  //     if (layerDiv) {
  //       layerDiv.addEventListener('dragover', this.defaultHandleDragEvent);
  //       layerDiv.addEventListener('dragleave', this.defaultHandleDragEvent);
  //       layerDiv.addEventListener('drop', this.onDrop);
  //     }
  //   }
  // }

  // drag and drop [end] -------------------------------------------------------

}
