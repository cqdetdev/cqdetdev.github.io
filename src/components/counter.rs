use yew::prelude::*;
#[derive(PartialEq, Properties)]
pub struct CounterProps {}

#[function_component]
pub(crate) fn Counter(props: &CounterProps) -> Html {
    let CounterProps {} = props;
    let count = use_state(|| 0);
    let onclick = {
        let count = count.clone();
        Callback::from(move |_: i32| count.set(*count + 1));
    };
    html! {
        <div>

        </div>
    }
}
