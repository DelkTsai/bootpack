// LIBS
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT ROUTES
import { DefaultRoute }    from './routes/default.route';
import { ErrorRoute }    from './routes/error.route';
import { TestRoute }    from './routes/test.route';

// DEFINE ROUTES
const appRoutes: Routes = [
  ...DefaultRoute,
  ...TestRoute,

  // ERROR ROUTE HAS TO COME LAST
  ...ErrorRoute
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
