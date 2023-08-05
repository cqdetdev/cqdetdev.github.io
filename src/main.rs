mod components;
use components::{navbar::Navbar, title::Title, counter::Counter, particles::Particles, typed::Typed};
mod pages;
use pages::{home::Home, page_not_found::PageNotFound, about::About};

use yew_router::prelude::*;
use yew::prelude::*;

#[derive(Routable, PartialEq, Eq, Clone, Debug)]
pub enum Route {
    #[at("/")]
    Home,
    #[at("/about")]
    About,
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

fn main(){
    yew::Renderer::<App>::new().render();
}

fn switch(routes: Route) -> Html {
    match routes {
        Route::Home => {
            html! { <Home /> }
        },
        Route::About => {
            html! { <About /> }
        }
        Route::NotFound => {
            html! { <PageNotFound /> }
        }
    }
}
