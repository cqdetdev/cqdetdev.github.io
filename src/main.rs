mod components;
use components::{
    counter::Counter, navbar::Navbar, particles::Particles, title::Title, typed::Typed,
};
mod pages;
use pages::{about::About, home::Home, login::Login, page_not_found::PageNotFound};

use yew::prelude::*;
use yew_router::prelude::*;

#[derive(Routable, PartialEq, Eq, Clone, Debug)]
pub enum Route {
    #[at("/")]
    Home,
    #[at("/about")]
    About,
    #[at("/login")]
    Login,
    #[not_found]
    #[at("/404")]
    NotFound,
}

#[function_component]
pub fn App() -> Html {
    html! {
        <BrowserRouter>
            <Navbar />
            <Particles />
            <div id="particles-js" class="flex"></div>
            <main>
                <Switch<Route> render={switch} />
            </main>

        </BrowserRouter>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}

fn switch(routes: Route) -> Html {
    match routes {
        Route::Home => {
            html! { <Home /> }
        }
        Route::About => {
            html! { <About /> }
        }
        Route::Login => {
            html! { <Login /> }
        }
        Route::NotFound => {
            html! { <PageNotFound /> }
        }
    }
}
