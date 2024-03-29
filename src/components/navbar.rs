use yew::prelude::*;

#[function_component]
pub fn Navbar() -> Html {
    html! {
        <nav class="bg-persian-red">
            <div class="mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:font-bold hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">{"Open main menu"}</span>
                        <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex flex-shrink-0 items-center">
                        <a href="/">
                            <img class="h-8 w-auto rounded-full" src="https://cdn.discordapp.com/avatars/522895569039917066/cfeb39aa5e6d8290f4a406c2ac3859af.webp?size=128" alt="Your Company"/>
                        </a>
                        </div>
                        <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <a href="/about" class="text-gray-300 hover:font-bold rounded-md px-3 py-2 text-sm font-medium">{"About"}</a>
                            <a href="https://github.com/cqdetdev/" class="text-gray-300 hover:font-bold hover:text-white rounded-md px-3 py-2 text-sm font-medium">{"Github"}</a>
                            <a href="https://github.com/cqdetdev/cqdetdev.github.io" class="text-gray-300 hover:font-bold hover:text-white rounded-md px-3 py-2 text-sm font-medium">{"Source"}</a>
                            <a href="#" class="text-gray-300 hover:font-bold hover:text-white rounded-md px-3 py-2 text-sm font-medium">{"Contact"}</a>
                        </div>
                        </div>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <a href="/login" class="bg-dark text-gray-300 hover:font-bold rounded-md px-3 py-2 text-sm font-medium">{"Login"}</a>
                    </div>
                    </div>
                </div>

            <div class="sm:hidden" id="mobile-menu">
                <div class="space-y-1 px-2 pb-3 pt-2">
                    <a href="/about" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">{"About"}</a>
                    <a href="https://github.com/cqdetdev/" class="text-gray-300 hover:font-bold hover:text-white block rounded-md px-3 py-2 text-base font-medium">{"Github"}</a>
                    <a href="https://github.com/cqdetdev/cqdetdev.github.io" class="text-gray-300 hover:font-bold hover:text-white block rounded-md px-3 py-2 text-base font-medium">{"Source"}</a>
                    <a href="#" class="text-gray-300 hover:font-bold hover:text-white block rounded-md px-3 py-2 text-base font-medium">{"Contact"}</a>
                    <a href="/login" class="bg-dark text-gray-300 hover:font-bold rounded-md px-3 py-2 text-sm font-medium">{"Login"}</a>

                </div>
            </div>
        </nav>
    }
}
