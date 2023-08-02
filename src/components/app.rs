use yew::prelude::*;
use crate::{Content, Navbar};

#[function_component]
pub fn App() -> Html {
    let fallback: yew::virtual_dom::VNode = html! {<div>{"Loading..."}</div>};

    html! {
        <Suspense {fallback}>
            <Navbar />
            <Content />
        </Suspense>
    }
}