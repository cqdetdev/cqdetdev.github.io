use yew::prelude::*;

#[derive(PartialEq, Properties)]
pub struct NavbarProps {}

#[function_component]
pub fn Navbar(props: &NavbarProps) -> Html {
    let NavbarProps {} = props;
    html! {
        <div>
        <nav class="navbar is-black" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <img href="assets/profile.webp" />
                </a>
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                <a class="navbar-item has-text-danger-dark has-background-black">
                    {"Home"}
                </a>

                <a class="navbar-item has-text-danger-dark has-background-black">
                    {"Github"}
                </a>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link has-text-danger-dark">
                    {"More"}
                    </a>

                    <div class="navbar-dropdown">
                    <a class="navbar-item is-dark">
                        {"About"}
                    </a>
                    <a class="navbar-item">
                        {"Contact"}
                    </a>
                    <hr class="navbar-divider"/>
                    <a class="navbar-item is-dark">
                        {"Report an issue"}
                    </a>
                    </div>
                </div>
                </div>

                <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <a class="button is-danger">
                        {"Press Me!"}
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </nav>
        </div>
    }
}