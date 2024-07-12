import { RouterModule } from "@angular/router";
import { Checkout } from "../pages/checkout/checkout.component";
import { Login } from "../pages/login/login.component";
import { OrderPage } from "../pages/order/order.component";
import { Register } from "../pages/register/register.component";
import { Shop } from "../pages/shop/shop.component";
import { AuthActivator } from "../services/authActivator.service";
import { AdminComponent } from "../pages/admin/admin.component";

const routes = [
    { path: "", component: Shop },
    { path: "checkout", component: Checkout, canActivate: [AuthActivator] },
    { path: "login", component: Login },
    { path: "register", component: Register },
    { path: "order", component: OrderPage, canActivate: [AuthActivator] },
    { path: "admin", component: AdminComponent, canActivate: [AuthActivator] },
    { path: "**", redirectTo: "/"}
];

const router = RouterModule.forRoot(routes, {useHash: true});

export default router;