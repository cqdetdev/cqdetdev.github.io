use yew::prelude::*;
use crate::{Content, Navbar};

#[function_component]
pub fn App() -> Html {
    let fallback = html! {<div>{"Loading Page..."}</div>};

    html! {
        <Suspense {fallback}>
                <Navbar />
                <Content />
        </Suspense>
    }
}