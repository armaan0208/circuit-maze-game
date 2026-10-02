# Short Circuit

A maze game built with only **HTML and CSS** (no JavaScript).

Move your mouse from the green input pad on the left to the lamp at the end of the maze. If your cursor touches a wall, the circuit shorts and you have to start again.

## How it works

- The maze is a 15 x 11 CSS grid. Every cell is a `div` styled as a wall or a path.
- Walls use the `:hover` selector to turn red and trigger the "Short circuit!" screen.
- The result screens are hidden with `visibility: hidden` and shown with the sibling selector (`~`).
- A very long `transition-delay` keeps the result on screen after the mouse moves away. The "Try again" link reloads the page.
- A media query (`hover: none`) shows a notice on touch screens, because the game needs a mouse.

## Run it

Download or clone the repository and open `index.html` in a browser.

## Play online with GitHub Pages

1. Push these files to a GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Source**, choose the `main` branch and the root folder, then save.
4. Your game will be live at `https://<your-username>.github.io/<repo-name>/`.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and maze cells |
| `style.css` | Layout, colors, hover logic and result screens |
