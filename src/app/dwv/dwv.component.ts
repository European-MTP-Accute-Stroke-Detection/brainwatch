import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { VERSION } from '@angular/core';
import * as dwv from 'dwv';
import Konva from 'konva';
import { MatDialog } from '@angular/material/dialog';
import { TagsDialogComponent } from './components/tags-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { Scan } from '../model/scan';
import { DicomsService } from '../workbench/services/dicoms.service';
import { SelectionChange } from '@angular/cdk/collections';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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

export class DwvComponent implements OnInit, OnDestroy {

  scans: Scan[];

  constructor(
    public dialog: MatDialog,
    public dicomsService: DicomsService,
    private fbStorage: AngularFireStorage,
  ) {
    this.versions = {
      dwv: dwv.getVersion(),
      angular: VERSION.full
    };
  }

  ngOnDestroy(): void {
    this.dwvApp.reset()
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
  selectedModelValue: string = 'default';
  showXai: boolean = false;


  segFile = 'https://firebasestorage.googleapis.com/v0/b/brainwatch-14583.appspot.com/o/Cases%2FaHTVkHc4fJfkyG7OY0C2%2Fscans%2FvFnqKPWi881GSagLQj0U.dcm?alt=media&token=180965b3-4949-47ea-b0be-499ca2004be8'

  ngOnInit() {
    this.dwvApp = new dwv.App();
    // initialise app
    this.dwvApp.init({
      dataViewConfigs: { '*': [{ divId: 'layerGroup0' }] },
      tools: this.tools,
    });
    // Load Dicom Files
    this.dicomsService.scans$.subscribe(scans => {
      if (scans && !this.scans) {
        this.scans = scans;
        this.dwvApp.loadURLs(
          this.scans.map(scan => scan.downloadUrl)
        );
      }
    });
    this.handleLoadEvents();
    this.handleTools();
    this.handleActionEvents();
  }

  readState() {
    var lg = this.dwvApp.getLayerGroupByDivId('layerGroup0');
    var vc = lg.getActiveViewLayer().getViewController();
    var index = vc.getCurrentIndex();
    var values = index.getValues();
    console.log(values);
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

  handleActionEvents() {
    // handle key events
    this.dwvApp.addEventListener('keydown', (event) => {
      this.dwvApp.defaultOnKeydown(event);
    });
    // update slider on slice change (for ex via mouse wheel)
    this.dwvApp.addEventListener('positionchange', (event) => {
      var lg = this.dwvApp.getLayerGroupByDivId('layerGroup0');
      this.dicomsService.currentScan$.next(
        this.scans.find(s => s.dicom_uid == event.data.imageUid)
      )
    });
    // handle window resize
    window.addEventListener('resize', this.dwvApp.onResize);
  }

  handleTools() {

  }


  handleLoadEvents() {
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
      // set initial dicom scan
      this.dicomsService.currentScan$.next(
        this.scans.find(s => s.dicom_uid == this.dwvApp.getImage(0).getImageUid())
      )
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
      // const state = new dwv.io.State();
      // const stateJson = state.toJSON(this.dwvApp);
      // console.log(stateJson);
      // console.log(state);
    });
    this.dwvApp.addEventListener('loaditem', (/*event*/) => {
      ++nLoadItem;
    });
    this.dwvApp.addEventListener('loaderror', (event) => {
      console.error(event.error);
      ++nReceivedLoadError;
    });
  }

  async modelSelected($event: any) {
    const model = this.dicomsService.availableModels$.value.find(m => m.value == $event.value);

    // Clears the layer group
    if (model.value == 'default') {
      var lg = this.dwvApp.getActiveLayerGroup();
      lg.empty();
      console.log(this.scans.map(scan => scan.downloadUrl))
      this.dwvApp.loadURLs(
        this.scans.map(scan => scan.downloadUrl)
      );
    }
    else {
      this.fbStorage
        .ref(`Cases/${this.dicomsService.currentCase$.value.uid}/results/${model.value}`)
        .listAll()
        .subscribe(async scans => {
          const urls = [];
          for (let scan of scans.items) {
            urls.push(await scan.getDownloadURL());
          }
          var lg = this.dwvApp.getActiveLayerGroup();
          lg.empty();
          this.dwvApp.loadURLs(urls);
        });
    }
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
