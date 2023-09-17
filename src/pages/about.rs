use yew::prelude::*;

use crate::Typed;

#[function_component]
pub(crate) fn About() -> Html {
    html! {
      <div class="flex h-screen justify-center items-center">
          <div class="mb-4 mt-4 text-4xl font-extrabold leading-none tracking-tight text-persian-red md:text-5xl lg:text-6xl">
          <Typed />
          <h2><span id="element"></span></h2>
        </div>
      </div>
    }
}
