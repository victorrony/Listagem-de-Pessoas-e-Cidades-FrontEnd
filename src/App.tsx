import { BrowserRouter } from "react-router-dom";

import "./shared/forms/traducoesYup";

import { AppRoutes } from "./routes";
import { AppThemeProvider, AuthProvider, DrawerProvider } from "./shared/contexts";
import { Cadastro, Login, MenuLateral } from "./shared/components";

export const App = () => {
   return (
      <AuthProvider>
         <AppThemeProvider>
            {/* <Login> */}
              {/* <Cadastro> */}
               <DrawerProvider>
                  <BrowserRouter>
                     <MenuLateral>
                        <AppRoutes />
                     </MenuLateral>
                  </BrowserRouter>
               </DrawerProvider>
               {/* </Cadastro> */}
            {/* </Login> */}
         </AppThemeProvider>
      </AuthProvider>
   );
};
