import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import * as dicomParser from 'dicom-parser';
import { fabric } from 'fabric';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';


@Component({
  selector: 'app-dicom-viewer',
  templateUrl: './dicom-viewer.component.html',
  styleUrls: ['./dicom-viewer.component.scss']
})
export class DicomViewerComponent implements OnInit {
  @ViewChild('canvas') canvasRef: ElementRef;
  canvasEl: HTMLCanvasElement;
  private fabricCanvas: fabric.Canvas;

  ngOnInit() {
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.dicomParser = dicomParser;
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    var config = {
      webWorkerPath: '/assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
      taskConfiguration: {
        'decodeTask': {
          codecsPath: '/assets/cornerstone/codecs/cornerstoneWADOImageLoaderCodecs.js',
          initializeCodecsOnStartup: true,
        }
      }
    }
    cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
  }

  ngAfterViewInit() {
    this.canvasEl = this.canvasRef.nativeElement;
    cornerstone.enable(this.canvasEl);
    this.loadDICOMImage()

    this.fabricCanvas = new fabric.Canvas(this.canvasEl, { selection: false });

    window.addEventListener('resize', () => {
      this.resizeCanvas(this.canvasEl);
    });
  }

  resizeCanvas(canvasEl: HTMLCanvasElement) {
    const element = cornerstone.getEnabledElement(canvasEl);
    if (element.image) {
      cornerstone.resize(element.element, true);
    }
  }

  loadDICOMImage() {
    const imageId = 'https://firebasestorage.googleapis.com/v0/b/brainwatch-14583.appspot.com/o/Cases%2FlPbQ1cn6zrSBgaWGBcx3%2Fscans%2FLRyqBp6TO4WoNwVMq5br.dcm?alt=media&token=bd3f99f4-a956-4908-90ec-1118cb492c5b';
    cornerstone.loadAndCacheImage("dicomweb:" + imageId).then((imageData: cornerstone.Image) => {
      var viewport = cornerstone.getDefaultViewportForImage(this.canvasEl, imageData);

      cornerstone.displayImage(this.canvasEl, imageData, viewport);

    }).catch(error => { console.error(error) });
  }

  drawRectangle() {
    const rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 60,
      height: 70,
      fill: 'red'
    });
    this.fabricCanvas.add(rect);
  }

  enableDrawingMode() {
    this.fabricCanvas.isDrawingMode = true;
  }

  disableDrawingMode() {
    this.fabricCanvas.isDrawingMode = false;
  }

  clearCanvas() {
    this.fabricCanvas.clear();
  }

  // Other functions for programmable elements and interactions
}
