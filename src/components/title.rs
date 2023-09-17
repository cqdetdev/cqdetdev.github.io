use yew::prelude::*;

#[derive(PartialEq, Properties)]
pub struct TitleProps {}

#[function_component]
pub(crate) fn Title(props: &TitleProps) -> Html {
    let TitleProps {} = props;
    html! {
    <div class="container">
        <div
            class="box has-background-dark has-text-danger"
            // style="display: flex; justify-content: center; align-items: center; height: 20vh; width: 40vh"
        >
            {"cqdetdev"}
        </div>
    </div>

    }
}
