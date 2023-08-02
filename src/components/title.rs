use yew::prelude::*;

#[derive(PartialEq, Properties)]
pub struct TitleProps {}

#[function_component]
pub fn Title(props: &TitleProps) -> Html {
    let TitleProps {} = props;
    html! {
        <div class="container">
            <h1 class="title is-1 has-text-centered has-text-danger-dark has-background-black">{ "cqdetdev.github.io" }</h1>
        </div>
    }
}