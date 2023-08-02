mod components;
use components::{Content, Navbar, App, Title};


fn main(){
    yew::Renderer::<App>::new().render();
}
