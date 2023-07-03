import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenefitComponent } from './benefit/benefit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth/authguard.service';
import { VerifyCertificateComponent } from './verify-certificate/verify-certificate.component';

const routes: Routes = [

{ path: '', component: LoginComponent },

{ path: 'benefit', component: BenefitComponent },

{ path: 'verify-certificate', component: VerifyCertificateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
