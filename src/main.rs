mod components;
use components::{navbar::Navbar, title::Title, counter::Counter};
mod pages;
use pages::{home::Home, page_not_found::PageNotFound};

use yew_router::prelude::*;
use yew::prelude::*;

#[derive(Routable, PartialEq, Eq, Clone, Debug)]
pub enum Route {
    #[at("/")]
    Home,
    #[not_found]
    #[at("/404")]
    NotFound,
}

#[function_component]
pub fn App() -> Html {
    html! {
        <BrowserRouter>
            <Navbar />

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
        }
        Route::NotFound => {
            html! { <PageNotFound /> }
        }
    }
}
