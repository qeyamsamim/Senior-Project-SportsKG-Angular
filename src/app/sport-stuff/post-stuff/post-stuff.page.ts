import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SportStuffService } from '../sport-stuff.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';

// Converts a base64 to a blob
function base64toBlob(base46Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base46Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-post-stuff',
  templateUrl: './post-stuff.page.html',
  styleUrls: ['./post-stuff.page.scss'],
})
export class PostStuffPage implements OnInit {
  form: FormGroup;
  constructor(private sportStuffService: SportStuffService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      productName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(200)]
      }),
      condition: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      city: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64', ''), 'image/jpeg');
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
       imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

  onCreatePost() {
    if (!this.form.valid || !this.form.get('image').value) {
      return;
    }
    // console.log(this.form.value);
    this.loadingCtrl
    .create({
      message: 'Posting...'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.sportStuffService
        .uploadImage(this.form.get('image').value)
        .pipe(
          switchMap(uploadRes => {
            return this.sportStuffService.addStuff(
              this.form.value.productName,
              this.form.value.description,
              this.form.value.price,
              this.form.value.condition,
              this.form.value.city,
              uploadRes.imageUrl
          );
        })
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/sport-stuff']);
      });
    });
  }
}
