import {renderToString} from "react-dom/server";
import App from "./App";

/** Function that will render App to HTML (used for SSR) */
export function render(): string {
    return renderToString(<App/>);
}
