import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[provideNgxMask()]
})
export class AppComponent {
  title = 'system-insurance-company';
}
