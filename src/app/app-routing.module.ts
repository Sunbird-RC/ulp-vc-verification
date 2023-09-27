import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanQrCodeComponent } from './scan-qr-code/scan-qr-code.component';

const routes: Routes = [

  { path: '', component: ScanQrCodeComponent },
  { path: 'verify/:credentialId', component: ScanQrCodeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
