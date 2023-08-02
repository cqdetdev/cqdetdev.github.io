use yew::prelude::*;
use crate::Title;


#[function_component]
pub fn Content() -> HtmlResult { 
    Ok(html! {
        <div class="has-background-black">
            <Title />
        </div>
    })
}