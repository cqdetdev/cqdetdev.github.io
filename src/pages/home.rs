use yew::prelude::*;

use crate::Typed;

#[function_component]
pub(crate) fn Home() -> Html {
    html! {
    <div class="container mx-auto mt-16 flex justify-center ">
      <div class="grid grid-cols-3 gap-8 p-4 max-w-6xl ">
        <div class="bg-transparent text-white shadow-lg border-2 border-persian-red rounded-xl">
          <div class="bg-persian-red py-2 px-4 text-center rounded-t-lg font-bold">{"Who?"}</div>
          <div class="p-4 text-center text-gray-300">{"Hi I'm cadet! I've started programming since 2019. My first ever project was a Discord Bot in JS called Swift aimed at 'swift' and simple moderation. Over the years, I've expanded my depths into web development, desktop/systems, and Minecraft Bedrock development."}</div>
        </div>

        <div class="bg-transparent text-white shadow-lg border-2 border-persian-red rounded-xl">
          <div class="bg-persian-red py-2 px-4 text-center rounded-t-lg font-bold">{"What?"}</div>
          <div class="p-4 text-center text-gray-300">{"I am fluent in a variety of languages: Typescript (Javascript), Go, Python, PHP. I am currently learning Rust. I have experience using softwares like AWS, React, Svelte, Digital Ocean, PostgresSQL, and MongoDB."}</div>
        </div>

        <div class="bg-transparent text-white shadow-lg border-2 border-persian-red rounded-xl">
          <div class="bg-persian-red py-2 px-4 text-center rounded-t-lg font-bold">{"Where?"}</div>
          <div class="p-4 text-center text-gray-300">{"I started working solo on my first Discord Bot and then continued solo working on small web-development projects. I then expanded out working on a plethora of relevant Minecraft Bedrock servers such as OwnagePE, Versai, Syn, Vasar, Zeqa and even my own server, Azura."}</div>
        </div>
      </div>
    </div>
  }
}
