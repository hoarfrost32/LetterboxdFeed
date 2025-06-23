# Letterboxd Feed Web Component

A simple, dependency-free Web Component to display the latest films from a user's public Letterboxd diary. It fetches the RSS feed, parses it, and renders a clean, styleable list of recently watched films.

## Features

-   **Easy to Use**: Just drop the script tag and the custom element into your HTML.
-   **Zero Dependencies**: Written in plain vanilla JavaScript, so it's lightweight and fast.
-   **Customizable**: Control the number of films to show and customize the look and feel with CSS.
-   **Encapsulated**: Uses Shadow DOM to keep its styles from interfering with the rest of your page.
-   **Informative**: Displays film titles, release years, and star ratings.

## Installation

To use this component, include the `LetterboxdFeed.js` script in your HTML file. Make sure the path is correct based on your project structure.

```html
<script src="path/to/LetterboxdFeed.js"></script>
```

## Usage

Once the script is included, you can add the `<letterboxd-feed>` custom element to your page. The `username` attribute is required.

```html
<letterboxd-feed username="your-letterboxd-username"></letterboxd-feed>
```

### Example

Here is a more complete example showing how to display the 10 most recent films for the user `dave`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Latest Watched Films</title>
    <script src="LetterboxdFeed.js"></script>
</head>
<body>

    <h1>Latest Films I've Watched</h1>
    <letterboxd-feed username="dave" count="10"></letterboxd-feed>

</body>
</html>
```

## Configuration

Configure the component by setting the following HTML attributes on the `<letterboxd-feed>` element:

| Attribute  | Description                                     | Type     | Default | Required |
| ---------- | ----------------------------------------------- | -------- | ------- | -------- |
| `username` | The Letterboxd username to fetch the diary from.  | `string` | `null`  | **Yes**  |
| `count`    | The number of recent films to display.          | `number` | `5`     | No       |

## Styling

The component's styles are encapsulated within its Shadow DOM. You can override the default styling by defining any of the following CSS Custom Properties on the `letterboxd-feed` element itself or in a global stylesheet.

### Example

```css
letterboxd-feed {
  --film-text-color: #cdd6f4;
  --film-muted-text-color: #7f849c;
  --film-star-active-color: #f5c2e7;
  --film-star-inactive-color: #45475a;
  --film-star-size: 1.1em;
  --film-max-width: 50rem;
}
```

### Available Properties

| CSS Custom Property          | Description                                    | Default Value                                  |
| ---------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `--film-text-color`          | The color of the film title text.              | `#b4befe`                                      |
| `--film-muted-text-color`    | The color of the dotted line.                  | `#a6adc8`                                      |
| `--film-star-active-color`   | The color of the filled portion of the stars.  | `color-mix(in hsl, #1e1e2e, white 35%)`        |
| `--film-star-inactive-color` | The color of the empty portion of the stars.   | `color-mix(in hsl, #1e1e2e, white 10%)`        |
| `--film-star-size`           | The font size of the rating stars.             | `1em`                                          |
| `--film-max-width`           | The maximum width of the component container.  | `40rem`                                        |

## How It Works

This component fetches a user's public Letterboxd diary from their RSS feed (`https://letterboxd.com/USERNAME/rss/`). To bypass potential CORS issues and to simplify parsing the XML feed in the browser, it uses the free `rss2json.com` API to convert the RSS feed to JSON.
