import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Plugins, Capacitor, CameraSource, Camera, CameraResultType } from '@capacitor/core';
import { Platform, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker', {static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  @Input() showPreview = false;
  selectedimage: string;
  usePicker = false;

  constructor(
    private plaform: Platform,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    // console.log('Mobile:', this.plaform.is('mobile'));
    // console.log('Hybrid:', this.plaform.is('hybrid'));
    // console.log('iOS:', this.plaform.is('ios'));
    // console.log('Android:', this.plaform.is('android'));
    // console.log('Desktop:', this.plaform.is('desktop'));
    if ((this.plaform.is('mobile') && !this.plaform.is('hybrid')) || this.plaform.is('desktop')) {
      this.usePicker = true;
    }
  }

  onPickImage() {
    this.actionSheetController.create({header: 'Please Choose', buttons: [
      {text: 'Camera', handler: () => {
        this.deviceCamera();
      }},
      {text: 'Pick Photo', handler: () => {
        this.filePickerRef.nativeElement.click();
      }},
      {text: 'Cancel', role: 'cancel' }
    ]
  }).then(actionSheetEl => {
    actionSheetEl.present();
  });
    // if (!Capacitor.isPluginAvailable('Camera') || this.usePicker) {
    //   this.filePickerRef.nativeElement.click();
    //   return;
    // }
  }

  deviceCamera() {
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64
    }).then(image => {
      this.selectedimage = image.base64String;
      this.imagePick.emit(image.base64String);
    }).catch(error => {
      console.log(error);
      if (!this.usePicker) {
        this.filePickerRef.nativeElement.click();
      }
      return false;
    });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedimage = dataUrl;
      this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }
}
