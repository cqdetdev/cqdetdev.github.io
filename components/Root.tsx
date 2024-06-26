"use client";
import Link from "next/link";
import Image from "next/image";
import {
    CardTitle,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/Card";
import React, { JSX, SVGProps } from "react";
import { TypeAnimation } from "react-type-animation";

const Root: React.FC = () => {
    return (
        <div
            key="1"
            className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-gray-950 to-[#1e1e1e] text-gray-50"
        >
            <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
                <Link className="flex items-center justify-center" href="#">
                    <CodeIcon className="h-6 w-6 text-red-500" />
                    <span className="sr-only">Developer Portfolio</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-sm font-medium hover:text-red-500"
                        href="#"
                    >
                        Home
                    </Link>
                    <Link
                        className="text-sm font-medium hover:text-red-500"
                        href="#projects"
                    >
                        Projects
                    </Link>
                    <Link
                        className="text-sm font-medium hover:text-red-500"
                        href="#skills"
                    >
                        Skills
                    </Link>
                    <Link
                        className="text-sm font-medium hover:text-red-500"
                        href="#contact"
                    >
                        Contact
                    </Link>
                    <Link
                        className="text-sm font-medium hover:text-red-500"
                        href="https://github.com/cqdetdev"
                    >
                        Github
                    </Link>
                </nav>
            </header>
            <section
                className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24 lg:py-32"
                id="hero"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <Image
                            alt="cqdetdev"
                            className="rounded-full mx-auto"
                            height={200}
                            src="https://avatars.githubusercontent.com/u/101936396?v=4"
                            style={{
                                aspectRatio: "200/200",
                                objectFit: "cover",
                            }}
                            width={200}
                        />
                        <div className="text-center">
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                                <TypeAnimation
                                    sequence={["cqdetdev"]}
                                    wrapper="p"
                                    speed={75}
                                    cursor={false}
                                />
                            </h1>
                            <p className="text-lg text-gray-400 mt-2">
                                <TypeAnimation
                                    sequence={[
                                        `Backend/Web Developer | Passionate about all things not front-end`,
                                    ]}
                                    wrapper="p"
                                    speed={75}
                                    cursor={false}
                                />
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight">
                            About Me
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            <TypeAnimation
                                sequence={[
                                    `Hi, I'm cqdetdev. I started programming in 2019 with Discord bots and and moved by way towards Minecraft: Bedrock Edition plugin development. I later found a love for Go and web development (specifically using React). I'm currently learning Rust and working more with React/Go/Typescript to create web apps and other backend resources.`,
                                ]}
                                wrapper="p"
                                speed={75}
                                cursor={false}
                            />
                        </p>
                    </div>
                </div>
            </section>
            <section
                className="bg-gradient-to-br from-gray-800 to-[#141414] py-12 md:py-24 lg:py-32 flex justify-center items-center"
                id="projects"
            >
                <div className="container px-4 md:px-6">
                    <div className="space-y-4 text-center">
                        <h2 className="text-2xl font-bold tracking-tight">
                            My Projects
                        </h2>
                        <p className="text-gray-400">
                            Check out some of the (public) projects I've worked
                            on.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                        <Card className="bg-gray-800 border border-gray-700 dark:border-gray-800 shadow-gray-900 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-gray-50">
                                    mcbe.dev
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400">
                                    A work-in-progress developer-oriented forum
                                    using Next.js, Tailwind, and Shadcn.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link
                                    className="inline-flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-950 disabled:pointer-events-none disabled:opacity-50"
                                    href="https://github.com/cqdetdev/mcbe.dev"
                                >
                                    View Project
                                </Link>
                            </CardFooter>
                        </Card>
                        <Card className="bg-gray-800 border  border-gray-700 dark:border-gray-800 shadow-gray-900 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-gray-50">
                                    TedacMC
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400">
                                    A proxy written in Go to allow gameplay on
                                    legacy Minecraft clients.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link
                                    className="inline-flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-950 disabled:pointer-events-none disabled:opacity-50"
                                    href="https://github.com/TedacMC/tedac"
                                >
                                    View Project
                                </Link>
                            </CardFooter>
                        </Card>
                        <Card className="bg-gray-800 border border-gray-200 dark:border-gray-800 shadow-gray-900 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-gray-50">
                                    Apollo
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400">
                                    A powerful, modular Discord bot written in
                                    TypeScript and built with SWC.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link
                                    className="inline-flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-950 disabled:pointer-events-none disabled:opacity-50"
                                    href="https://github.com/cqdetdev/apollo"
                                >
                                    View Project
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>
            <section
                className="py-12 md:py-24 lg:py-32 flex justify-center items-center"
                id="skills"
            >
                <div className="container px-4 md:px-6">
                    <div className="space-y-4 text-center">
                        <h2 className="text-2xl font-bold tracking-tight">
                            My Skills
                        </h2>
                        <p className="text-gray-400">
                            Here are some of the technologies I'm proficient in.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 mt-8">
                        <div className="flex flex-col items-center space-y-2">
                            <ReactIcon className="w-8 h-8 text-red-500 animate-bounce" />
                            <span className="text-sm">React</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <NodeIcon className="w-8 h-8 text-red-500 animate-bounce" />
                            <span className="text-sm">Node.js</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <TypeScriptIcon className="w-8 h-8 text-red-500 animate-bounce" />
                            <span className="text-sm">TypeScript</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <GoIcon className="w-8 h-8 text-red-500 animate-bounce" />
                            <span className="text-sm">Go</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <WindIcon className="w-8 h-8 text-red-500 animate-bounce" />
                            <span className="text-sm">Tailwind CSS</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <FolderGitIcon className="w-8 h-8 text-red-500 animate-bounce" />
                            <span className="text-sm">Git</span>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="bg-gradient-to-br from-gray-800 to-[#141414] py-12 md:py-24 lg:py-32 flex justify-center items-center"
                id="contact"
            >
                <div className="container px-4 md:px-6">
                    <div className="space-y-4 text-center">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Get in Touch
                        </h2>
                        <p className="text-gray-400 animate-fade-in">
                            <Link
                                className="underline"
                                href="https://discord.com/users/522895569039917066"
                            >
                                Feel free to reach out to me on Discord for any
                                inquiries, collaboration, or commissions
                                involving MCBE or web-dev.
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
            <footer className="bg-gray-800 py-6 text-center">
                <p className="text-gray-400 text-sm">
                    © 2024 cqdetdev. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Root;

const CodeIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    );
};

const FolderGitIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
            <circle cx="12" cy="13" r="2" />
            <path d="M14 13h3" />
            <path d="M7 13h3" />
        </svg>
    );
};

const NodeIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="2270"
            height="2500"
            viewBox="0 0 256 282"
        >
            <title>Node.JS</title>
            <circle cx="0" cy="0" r="2.05" fill="#ef4444" />
            <g stroke="#ef4444" strokeWidth="10" fill="none">
                <path d="M116.504 3.58c6.962-3.985 16.03-4.003 22.986 0 34.995 19.774 70.001 39.517 104.99 59.303 6.581 3.707 10.983 11.031 10.916 18.614v118.968c.049 7.897-4.788 15.396-11.731 19.019-34.88 19.665-69.742 39.354-104.616 59.019-7.106 4.063-16.356 3.75-23.24-.646-10.457-6.062-20.932-12.094-31.39-18.15-2.137-1.274-4.546-2.288-6.055-4.36 1.334-1.798 3.719-2.022 5.657-2.807 4.365-1.388 8.374-3.616 12.384-5.778 1.014-.694 2.252-.428 3.224.193 8.942 5.127 17.805 10.403 26.777 15.481 1.914 1.105 3.852-.362 5.488-1.274 34.228-19.345 68.498-38.617 102.72-57.968 1.268-.61 1.969-1.956 1.866-3.345.024-39.245.006-78.497.012-117.742.145-1.576-.767-3.025-2.192-3.67-34.759-19.575-69.5-39.18-104.253-58.76a3.621 3.621 0 0 0-4.094-.006C91.2 39.257 56.465 58.88 21.712 78.454c-1.42.646-2.373 2.071-2.204 3.653.006 39.245 0 78.497 0 117.748a3.329 3.329 0 0 0 1.89 3.303c9.274 5.259 18.56 10.481 27.84 15.722 5.228 2.814 11.647 4.486 17.407 2.33 5.083-1.823 8.646-7.01 8.549-12.407.048-39.016-.024-78.038.036-117.048-.127-1.732 1.516-3.163 3.2-3 4.456-.03 8.918-.06 13.374.012 1.86-.042 3.14 1.823 2.91 3.568-.018 39.263.048 78.527-.03 117.79.012 10.464-4.287 21.85-13.966 26.97-11.924 6.177-26.662 4.867-38.442-1.056-10.198-5.09-19.93-11.097-29.947-16.55C5.368 215.886.555 208.357.604 200.466V81.497c-.073-7.74 4.504-15.197 11.29-18.85C46.768 42.966 81.636 23.27 116.504 3.58z" />
                <path d="M146.928 85.99c15.21-.979 31.493-.58 45.18 6.913 10.597 5.742 16.472 17.793 16.659 29.566-.296 1.588-1.956 2.464-3.472 2.355-4.413-.006-8.827.06-13.24-.03-1.872.072-2.96-1.654-3.195-3.309-1.268-5.633-4.34-11.212-9.642-13.929-8.139-4.075-17.576-3.87-26.451-3.785-6.479.344-13.446.905-18.935 4.715-4.214 2.886-5.494 8.712-3.99 13.404 1.418 3.369 5.307 4.456 8.489 5.458 18.33 4.794 37.754 4.317 55.734 10.626 7.444 2.572 14.726 7.572 17.274 15.366 3.333 10.446 1.872 22.932-5.56 31.318-6.027 6.901-14.805 10.657-23.56 12.697-11.647 2.597-23.734 2.663-35.562 1.51-11.122-1.268-22.696-4.19-31.282-11.768-7.342-6.375-10.928-16.308-10.572-25.895.085-1.619 1.697-2.748 3.248-2.615 4.444-.036 8.888-.048 13.332.006 1.775-.127 3.091 1.407 3.182 3.08.82 5.367 2.837 11 7.517 14.182 9.032 5.827 20.365 5.428 30.707 5.591 8.568-.38 18.186-.495 25.178-6.158 3.689-3.23 4.782-8.634 3.785-13.283-1.08-3.925-5.186-5.754-8.712-6.95-18.095-5.724-37.736-3.647-55.656-10.12-7.275-2.571-14.31-7.432-17.105-14.906-3.9-10.578-2.113-23.662 6.098-31.765 8.006-8.06 19.563-11.164 30.551-12.275z" />
            </g>
        </svg>
    );
};

const TypeScriptIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 400 400"
            width="2500"
            height="2500"
        >
            <path className="st0" fill="#ef4444" d="M0 200V0h400v400H0" />
            <path
                className="st1"
                d="M87.7 200.7V217h52v148h36.9V217h52v-16c0-9 0-16.3-.4-16.5 0-.3-31.7-.4-70.2-.4l-70 .3v16.4l-.3-.1zM321.4 184c10.2 2.4 18 7 25 14.3 3.7 4 9.2 11 9.6 12.8 0 .6-17.3 12.3-27.8 18.8-.4.3-2-1.4-3.6-4-5.2-7.4-10.5-10.6-18.8-11.2-12-.8-20 5.5-20 16 0 3.2.6 5 1.8 7.6 2.7 5.5 7.7 8.8 23.2 15.6 28.6 12.3 41 20.4 48.5 32 8.5 13 10.4 33.4 4.7 48.7-6.4 16.7-22 28-44.3 31.7-7 1.2-23 1-30.5-.3-16-3-31.3-11-40.7-21.3-3.7-4-10.8-14.7-10.4-15.4l3.8-2.4 15-8.7 11.3-6.6 2.6 3.5c3.3 5.2 10.7 12.2 15 14.6 13 6.7 30.4 5.8 39-2 3.7-3.4 5.3-7 5.3-12 0-4.6-.7-6.7-3-10.2-3.2-4.4-9.6-8-27.6-16-20.7-8.8-29.5-14.4-37.7-23-4.7-5.2-9-13.3-11-20-1.5-5.8-2-20-.6-25.7 4.3-20 19.4-34 41-38 7-1.4 23.5-.8 30.4 1l-.2.2z"
            />
        </svg>
    );
};

const WindIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
            <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
        </svg>
    );
};

const GoIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            height="959"
            viewBox="-.1 -1 206.8 78.4"
            width="2700"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15.5 23.2c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6zm-15.1 9.2c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6zm24.2 9.2c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.7-.7.7zm103.8-20.2c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7h-19.3c-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h36.4c-.2 2.7-.2 5.4-.6 8.1-1.1 7.2-3.8 13.8-8.2 19.6-7.2 9.5-16.6 15.4-28.5 17-9.8 1.3-18.9-.6-26.9-6.6-7.4-5.6-11.6-13-12.7-22.2-1.3-10.9 1.9-20.7 8.5-29.3 7.1-9.3 16.5-15.2 28-17.3 9.4-1.7 18.4-.6 26.5 4.9 5.3 3.5 9.1 8.3 11.6 14.1.6.9.2 1.4-1 1.7z" />
            <path d="m161.5 76.7c-9.1-.2-17.4-2.8-24.4-8.8-5.9-5.1-9.6-11.6-10.8-19.3-1.8-11.3 1.3-21.3 8.1-30.2 7.3-9.6 16.1-14.6 28-16.7 10.2-1.8 19.8-.8 28.5 5.1 7.9 5.4 12.8 12.7 14.1 22.3 1.7 13.5-2.2 24.5-11.5 33.9-6.6 6.7-14.7 10.9-24 12.8-2.7.5-5.4.6-8 .9zm23.8-40.4c-.1-1.3-.1-2.3-.3-3.3-1.8-9.9-10.9-15.5-20.4-13.3-9.3 2.1-15.3 8-17.5 17.4-1.8 7.8 2 15.7 9.2 18.9 5.5 2.4 11 2.1 16.3-.6 7.9-4.1 12.2-10.5 12.7-19.1z" />
        </svg>
    );
};

const ReactIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-11.5 -10.23174 23 20.46348"
        >
            <title>React</title>
            <circle cx="0" cy="0" r="2.05" fill="#ef4444" />
            <g stroke="#ef4444" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
        </svg>
    );
};
