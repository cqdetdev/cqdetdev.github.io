use actix_web::{get, App as ActixApp, Error, HttpResponse, HttpServer};
use tokio::task::{LocalSet, spawn_blocking};
use yew::prelude::*;
mod components;
use components::{Content, Navbar, App, Title};

#[get("/")]
async fn render() -> Result<HttpResponse, Error> {
    let content: String = spawn_blocking(move || {
        use tokio::runtime::Builder;
        let set: LocalSet = LocalSet::new();

        let rt = Builder::new_current_thread().enable_all().build().unwrap();

        set.block_on(&rt, async {
            let renderer = yew::ServerRenderer::<App>::new();

            renderer.render().await
        })
    })
    .await.expect("the thread has failed.");

    Ok(HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
    .body(format!(
        r#"<!DOCTYPE html>
        <html lang="en" class="has-background-black">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to cqdet.github.io</title>
            <link data-trunk rel="copy-dir" href="./assets"/>
            <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"
          />
        </head>
        <body>
            {}
        </body>
        </html>
        "#,
        content
    )))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let server = HttpServer::new(|| ActixApp::new().service(render));
    println!("You can view the website at: http://localhost:8080/");
    server.bind(("127.0.0.1", 8080))?.run().await
}
