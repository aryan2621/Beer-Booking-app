import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { SearchComponent } from './pages/search/search.component';
import { ShopsComponent } from './components/shops/shops.component';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { firebaseConfig, stripeConfig } from 'src/APIs/db/db';
import { NgxStripeModule } from 'ngx-stripe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    DashboardComponent,
    HomeComponent,
    AboutComponent,
    CartComponent,
    SearchComponent,
    ShopsComponent,
    ProductsComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgxStripeModule.forRoot(stripeConfig.PK),
    GooglePayButtonModule,
    AlertModule.forRoot(),
  ],
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useValue: firebaseConfig,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
