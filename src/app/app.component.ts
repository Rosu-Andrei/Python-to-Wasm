import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  wasmModule: any;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Check if the code is running in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadWasmModule();
    }
  }

  loadWasmModule() {
    // Dynamically load the Emscripten-generated JavaScript file
    const script = document.createElement('script');
    script.src = 'assets/hello2.js';  // Path to the Emscripten-generated JavaScript file
    script.onload = () => {
      // After the script is loaded, the Module object (from Emscripten) will be available
      (window as any).Module.onRuntimeInitialized = () => {
        // Now you can access the exported functions from the WebAssembly module
        const hello = (window as any).Module._hello_world();  // Note the underscore
        console.log('Hello from WebAssembly:', hello);
      };
    };
    document.body.appendChild(script);
  }
}
