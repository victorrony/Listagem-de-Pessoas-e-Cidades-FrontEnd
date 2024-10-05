import { BrowserRouter } from "react-router-dom";

import "./shared/forms/traducoesYup";

import { AppRoutes } from "./routes";
import { AppThemeProvider, AuthProvider, DrawerProvider } from "./shared/contexts";
import { AuthPage, MenuLateral } from "./shared/components";

export const App = () => {
   return (
      <AuthProvider>
         <AppThemeProvider>
            <AuthPage>
               <DrawerProvider>
                  <BrowserRouter>
                     <MenuLateral>
                        <AppRoutes />
                     </MenuLateral>
                  </BrowserRouter>
               </DrawerProvider>
            </AuthPage>
         </AppThemeProvider>
      </AuthProvider>
   );
};
