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
    const canvasEl: HTMLCanvasElement = this.canvasRef.nativeElement;
    cornerstone.enable(canvasEl);
    // const rect = new fabric.Rect({
    //   left: 100,
    //   top: 100,
    //   width: 200,
    //   height: 100,
    //   fill: 'red'
    // });
    // const fabricCanvas = new fabric.Canvas(canvasEl);
    // fabricCanvas.add(rect);
  }

  loadDICOMImage() {
    const imageId = 'https://firebasestorage.googleapis.com/v0/b/brainwatch-14583.appspot.com/o/Cases%2FlPbQ1cn6zrSBgaWGBcx3%2Fscans%2FLRyqBp6TO4WoNwVMq5br.dcm?alt=media&token=bd3f99f4-a956-4908-90ec-1118cb492c5b';
    cornerstone.loadAndCacheImage("dicomweb:" + imageId).then((imageData: cornerstone.Image) => {
      console.log(imageData);
      var viewport = cornerstone.getDefaultViewportForImage(this.canvasRef.nativeElement, imageData);
      console.log(this.canvasRef.nativeElement);
      cornerstone.displayImage(this.canvasRef.nativeElement, imageData, viewport);
    }).catch(error => { console.error(error) });
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
