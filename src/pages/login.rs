use yew::prelude::*;

#[function_component]
pub(crate) fn Login() -> Html {
    html! {
    <div class="container mx-auto mt-32 flex justify-center">
        <div class="grid grid-cols-1">
          <div class="bg-transparent text-white shadow-lg border-2 border-persian-red rounded-xl">
            <div class="bg-persian-red py-2 px-4 text-center rounded-t-lg font-bold">{"Login"}</div>
            <div class="p-4 text-center text-gray-300">{"TODO"}</div>
          </div>
        </div>
      </div>
    }
}
