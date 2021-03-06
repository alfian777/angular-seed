import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.APP_TITLE = 'Asahi Kasei Taiwan Demo';
    this.GOOGLE_ANALYTICS_ID = 'UA-22565745-2';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      //{src: '@angular/material/core/theming/prebuilt/indigo-pink.css', inject: true},
      //{src: 'angular2-jwt/angular2-jwt.js', inject: 'libs'},
      {src: 'jquery/dist/jquery.slim.min.js', inject: 'libs'},
      {src: 'tether/dist/js/tether.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/css/bootstrap.min.css', inject: true}
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    // Add packages (e.g. ng2-translate)

    this.SYSTEM_BUILDER_CONFIG.packageConfigPaths.push(join('node_modules', '@ng-bootstrap', '*', 'package.json'));

    //this.SYSTEM_CONFIG_DEV.path['@sharedmodule'] = "src/client/app/shared/shared.module";

    let additionalPackages : ExtendPackages[] = 
    [
      /*
      {
        name:'@angular/material',
        path:'node_modules/@angular/material/bundles/material.umd.js',
        packageMeta:{
          main: 'index.js',
          defaultExtension: 'js'
        }
      },
      */
      /*
      {
        name:'angular2-jwt',
        path:'node_modules/angular2-jwt/angular2-jwt.js',
        packageMeta:{
          main: 'angular2-jwt.js',
          defaultExtension: 'js'
        }
      },
      */
      {
        name:'@ng-bootstrap/ng-bootstrap',
        path:'node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
        packageMeta:{
          main: 'index.js',
          defaultExtension: 'js'
        }
      },
     ];
    //
    this.addPackagesBundles(additionalPackages);

    /* Add proxy middlewar */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')({ ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
