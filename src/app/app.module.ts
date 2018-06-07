import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { BoundComponent } from './bound/bound.component';
import { TwainComponent } from './twain/twain.component';
import { TwainService } from './twain.service';
import { RoutingComponent } from './routing/routing.component';
import { HighlightDirective } from './highlight.directive';
import { TitlePipe } from './title.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    BoundComponent,
    TwainComponent,
    RoutingComponent,
    HighlightDirective,
    TitlePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [TwainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
